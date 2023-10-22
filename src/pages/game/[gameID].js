import React, {useEffect, useRef, useState} from "react";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import TabMenu from "@/components/gameComponents/tabmenu";
import BattleMap from "@/components/gameComponents/battlemap";
import {
    DraggableArmorWindow,
    DraggableAshOfWarWindow,
    DraggableCharacterWindow,
    DraggableConditionWindow,
    DraggableMagicItemWindow,
    DraggableMonsterWindow,
    DraggableSpellWindow,
    DraggableWeaponWindow
} from "@/components/gameComponents/sheets/draggablewindow";
import useBattlemapStore from "@/stores/battlemapStore";
import ToolBar from "@/components/gameComponents/toolbar";
import {useRouter} from "next/router";
import {getGame, messageByGameAndCreatedAt} from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import {onCreateMessage} from "@/graphql/subscriptions";

function GameID() {
    const {
        gameID,
        setGameID,
        gameMode,
        setGameMode,
        setPlayerID,
        setGamePlayers,
        activeMap,
        setActiveMap
    } = useBattlemapStore();
    const {
        characterSheetWindows,
        monsterBlocks,
        spellCards,
        magicItemCards,
        weaponCards,
        armorCards,
        conditionCards,
        ashOfWarCards
    } = useBattlemapStore()

    const {playingSong, setPlayingSong, setIsSongPlaying, setSongQueue} = useBattlemapStore()

    const mapTokensRef = useRef([])
    const mapDimensionsRef = useRef({width: 0, height: 0})

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [gameName, setGameName] = useState(null)
    const [messages, setMessages] = useState([]);

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

            const activeMapDetails = {
                id: gameID,
                songQueue: []
            };

            const updatedGame = await API.graphql({
                query: mutations.updateGame,
                variables: {input: activeMapDetails}
            });

            setGameMode(gamesReq.data.getGame.gameMode)

            setIsSongPlaying(gamesReq.data.getGame.songPlaying)
            setSongQueue(gamesReq.data.getGame.songQueue)
            if (playingSong !== gamesReq.data.getGame.activeSong) {
                const newSong = await Storage.get('music/' + gamesReq.data.getGame.activeSong, {
                    level: 'protected',
                    identidyId: '253A4971ef34-3da5-4205-87cc-ca1cbcd4a019'
                })
                console.log(playingSong)
                setPlayingSong(newSong)
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

    useEffect(() => {
        const getMessages = async () => {
            const response = await API.graphql({
                query: messageByGameAndCreatedAt,
                variables: {
                    gameId: gameID,
                    limit: 100,
                    sortDirection: "DESC"
                }
            });
            // console.log(response)
            // setMessages(response.data.listMessages.items)
            // console.log("Initial fetch chatroom messages:")
            // console.log(response.data.listMessages.items)

            console.log(response)
            setMessages(response.data.messageByGameAndCreatedAt.items)
            console.log("Initial fetch chatroom messages:")
            console.log(response.data.messageByGameAndCreatedAt.items)
        }
        if (gameID) {
            getMessages()

        }
    }, [gameID])

    useEffect(() => {
        // Define the subscription handler
        const subscriptionHandler = (data) => {
            const newMessage = data.value.data.onCreateMessage;
            console.log('New Message', newMessage);
            setMessages((prevMessages) => [newMessage].concat(prevMessages))
        };

        const subscription = API.graphql(
            graphqlOperation(onCreateMessage, {gameId: gameID}),
            {
                filter: {
                    mutationType: {
                        eq: 'create',
                    }
                },
            }
        ).subscribe({
            next: (data) => {
                subscriptionHandler(data);
            },
            error: (error) => {
                console.error('Subscription Error:', error);
            },
        });
        // Clean up the subscription when the component unmounts or the tab switches
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [])

    if (user && gameName) {
        return (
            <div className="app">
                <div className={"appContainer"}>
                    <ToolBar mapTokensRef={mapTokensRef} mapDimensionsRef={mapDimensionsRef}/>
                    <BattleMap className="BattleMap" mapTokensRef={mapTokensRef} mapDimensionsRef={mapDimensionsRef}/>
                    <TabMenu user={user} messages={messages}/>
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
                {ashOfWarCards.map((item) => (
                    <DraggableAshOfWarWindow key={item.slug} slug={item.slug}/>
                ))}

            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

// export default Home;
export default GameID;
