import React, {useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {withAuthenticator} from "@aws-amplify/ui-react";
import {API, Auth, withSSRContext, graphqlOperation} from "aws-amplify";
import TabMenu from "@/components/tabmenu";
import BattleMap from "@/components/battlemap";
import CharacterSheet from "@/components/charactersheet";
import DraggableWindow, {DraggableCharacterWindow, DraggableMonsterWindow} from "@/components/draggablewindow";
import useBattlemapStore from "@/stores/battlemapStore";
import MonsterSheet from "@/components/monstersheet";

function Home() {
  // const addCharacterSheetWindow = useBattlemapStore((state) => state.addCharacterSheetWindow);
  const characterSheetWindows = useBattlemapStore((state) => state.characterSheetWindows)
  const monsterBlocks = useBattlemapStore((state) => state.monsterBlocks)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, [])

  if (user) {
    console.log('User', user)
    return (
      <div className="app">
        <div className={"appContainer"}>
          <BattleMap/>
          <TabMenu user={user}/>
          {/*<MonsterSheet slug={'aboleth'}/>*/}
        </div>
        {characterSheetWindows.map((sheet) => (
          <DraggableCharacterWindow key={sheet.id} characterSheet={sheet}/>
        ))}
        {monsterBlocks.map((monster) => (
          <DraggableMonsterWindow key={monster.slug} slug={monster.slug}/>
        ))}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

// export default Home;
export default withAuthenticator(Home);
