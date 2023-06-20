import React, {useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {withAuthenticator} from "@aws-amplify/ui-react";
import {API, Auth, withSSRContext, graphqlOperation} from "aws-amplify";
import TabMenu from "@/components/tabmenu";
import BattleMap from "@/components/battlemap";
import CharacterSheet from "@/components/charactersheet";
import DraggableWindow from "@/components/draggablewindow";
import useBattlemapStore from "@/stores/battlemapStore";

function Home() {
  const addCharacterSheet = useBattlemapStore((state) => state.addCharacterSheet);
  const characterSheets = useBattlemapStore((state) => state.characterSheets)
  const [user, setUser] = useState(null);
  useEffect(() => {

    // Add character sheets
    addCharacterSheet(1, 'Character Sheet 1');
    addCharacterSheet(2, 'Character Sheet 2');
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
          {/*<CharacterSheet/>*/}
        </div>
        {characterSheets.map((sheet) => (
          <DraggableWindow key={sheet.id} content={sheet}/>
        ))}
      </div>
    );
  } else {
    console.log('No user')
    return <p>Loading...</p>;
  }
}

export default Home;
// export default withAuthenticator(Home);
