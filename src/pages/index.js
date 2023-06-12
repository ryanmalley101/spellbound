import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext, graphqlOperation } from "aws-amplify";
import { listMessages } from "@/graphql/queries";
import { createMessage } from "@/graphql/mutations";
import { onCreateMessage } from "@/graphql/subscriptions";
import Message from "../components/message";
import ChatRoom from "@/components/chatroom";
import BattleMap from "@/components/battlemap";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TabMenu from "@/components/tabmenu";
import Head from 'next/head';
import CharacterSheet from "@/components/charactersheet";

function Home({ messages }) {

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
    return (
      <div className="app">
        <div className={"appContainer"}>
          {/*<BattleMap />*/}
          {/*<TabMenu user={user}/>*/}
          <CharacterSheet/>
        </div>
      </div>
  );
  } else {
    return <p>Loading...</p>;
  }
}

export default withAuthenticator(Home);
