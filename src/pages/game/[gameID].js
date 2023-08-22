import React, {useEffect, useState} from "react";
import {API, Auth, withSSRContext, graphqlOperation} from "aws-amplify";
import TabMenu from "@/components/gameComponents/tabmenu";
import BattleMap from "@/components/gameComponents/battlemap";
import DraggableWindow, {
  DraggableCharacterWindow,
  DraggableMonsterWindow,
  DraggableSpellWindow,
  DraggableMagicItemWindow,
  DraggableWeaponWindow,
  DraggableArmorWindow,
  DraggableConditionWindow
} from "@/components/gameComponents/draggablewindow";
import useBattlemapStore from "@/stores/battlemapStore";
import ToolBar from "@/components/gameComponents/toolbar";
import {useRouter} from "next/router";
import {getGame} from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

function GameID() {
  const {gameID, setGameID, activeMap, setActiveMap} = useBattlemapStore();
  const characterSheetWindows = useBattlemapStore((state) => state.characterSheetWindows)
  const monsterBlocks = useBattlemapStore((state) => state.monsterBlocks)
  const spellCards = useBattlemapStore((state) => state.spellCards)
  const magicItemCards = useBattlemapStore((state) => state.magicItemCards)
  const weaponCards = useBattlemapStore((state) => state.weaponCards)
  const armorCards = useBattlemapStore((state) => state.armorCards)
  const conditionCards = useBattlemapStore((state) => state.conditionCards)

  const setPlayerID = useBattlemapStore(state => state.setPlayerID)
  const setGamePlayers = useBattlemapStore(state => state.setGamePlayers)

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [gameName, setGameName] = useState(null)
  const idQuery = router.query;
  const fetchUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      setUser(amplifyUser);
    } catch (err) {
      setUser(null);
    }
  };

  const fetchGame = async () => {
    if (gameID) {
      console.log(`Fetch game gameID`)
      console.log(gameID)
      const gamesReq = await API.graphql({
        query: getGame,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {id: gameID}
      });
      console.log(gamesReq.data.getGame)
      console.log("Game name: ", gamesReq.data.getGame.name)
      setGameName(gamesReq.data.getGame.name)
      const players = gamesReq.data.getGame.players.items
      console.log("Game players: ", players)
      setGamePlayers(players)
      console.log(user)
      const userPlayer = players.filter((player) => player.userPlayersId === user.attributes.sub)
      if (userPlayer.length > 1) {
        console.error("More than one matching player was found for the logged in user")
        console.error(userPlayer)
      } else if (userPlayer.length === 0) {
        console.log("No matching player found for logged in user")
      } else {
        console.log(`PlayerID ${userPlayer[0].id}`)
        setPlayerID(userPlayer[0].id)
      }
      const maps = (gamesReq.data.getGame.maps.items)
      if (maps.length === 0) {
        console.log("Current game has no maps")
      } else if (!gamesReq.data.getGame.activeMap) {
        console.log("Current game has no active map")
        const activeMapDetails = {
          id: gameID,
//  _version: 'current_version', // add the "_version" field if your AppSync API has conflict detection (required for DataStore) enabled
          activeMap: maps[0].id
        };

        const updatedGame = await API.graphql({
          query: mutations.updateGame,
          variables: {input: activeMapDetails}
        });
        console.log(updatedGame)
        setActiveMap(updatedGame.data.updateGame.activeMap)
      } else {
        setActiveMap(gamesReq.data.getGame.activeMap)
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    const initialFetch = async () => {
      console.log(`ID Query`)
      console.log(idQuery.gameID)

      setGameID(idQuery.gameID)
      console.log(`Post set gameID`)
      console.log(gameID)
    }
    if (!idQuery) return
    initialFetch()
  }, [router.isReady])

  useEffect(() => {
    if (!gameID || !user) return

    console.log("Use effect game ID")
    console.log(gameID)
    fetchGame()
  }, [gameID, user])

  if (user && gameName) {
    return (
      <div className="app">
        <div className={"appContainer"}>
          <div className="ToolBarContainer">
            <div className="ToolBar">
              <ToolBar/>
            </div>
          </div>
          <div className="BattleMapContainer">
            <BattleMap className="BattleMap"/>
          </div>
          <div className="TabMenuContainer">
            <div className="TabMenu">
              <TabMenu user={user}/>
            </div>
          </div>
        </div>
        {characterSheetWindows.map((sheet) => (
          <DraggableCharacterWindow key={sheet.id} characterSheet={sheet}/>
        ))}
        {monsterBlocks.map((monster) => (
          <DraggableMonsterWindow key={monster.slug} slug={monster.slug}/>
        ))}
        {spellCards.map((spell) => (
          <DraggableSpellWindow key={spell.slug} slug={spell.slug}/>
        ))}
        {magicItemCards.map((item) => (
          <DraggableMagicItemWindow key={item.slug} slug={item.slug}/>
        ))}
        {weaponCards.map((item) => (
          <DraggableWeaponWindow key={item.slug} slug={item.slug}/>
        ))}
        {armorCards.map((item) => (
          <DraggableArmorWindow key={item.slug} slug={item.slug}/>
        ))}
        {conditionCards.map((item) => (
          <DraggableConditionWindow key={item.slug} slug={item.slug}/>
        ))}

      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

// export default Home;
export default GameID;
