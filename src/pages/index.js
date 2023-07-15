import React, {useState, useEffect} from 'react';
import GameList from '@/components/landingComponents/gamelist';
import CreateGame from '@/components/landingComponents/creategame';
import {Auth} from "aws-amplify";
import {ThemeProvider} from "@mui/material";
import themeOptions from "@/themes/muitheme";
import LandingMenuBar from "@/components/landingComponents/landingmenubar";
import '@aws-amplify/ui-react/styles.css';
import useBattlemapStore from "@/stores/battlemapStore";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
        console.log(user)
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser()
  }, [])

  return (
    <ThemeProvider theme={themeOptions}>
      <LandingMenuBar user={user} setUser={setUser}/>
      <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
      {user ? <CreateGame user={user}/> : null}
      {user ? <GameList user={user}/> : null}
    </ThemeProvider>
  );
};

export default App;