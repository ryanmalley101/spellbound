import React, {useState, useEffect} from 'react';
import GameList from '@/components/landingComponents/gamelist';
import CreateGame from '@/components/landingComponents/creategame';
import {Auth} from "aws-amplify";
import {ThemeProvider} from "@mui/material";
import themeOptions from "@/themes/muitheme";
import LandingMenuBar from "@/components/landingComponents/landingmenubar";
import '@aws-amplify/ui-react/styles.css';


const App = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
      }
    };
    // Simulated API call to fetch games for the signed-in user
    // Replace this with your actual API call to fetch the games
    const fetchGames = async () => {
      // Simulated response data (Replace with your API response)
      const response = [
        {id: 'game1', name: 'Game 1'},
        {id: 'game2', name: 'Game 2'},
      ];
      setGames(response);
    };

    // Fetch games for the signed-in user
    fetchGames();
    fetchUser();
  }, [])

  return (
    <ThemeProvider theme={themeOptions}>
      <LandingMenuBar user={user} setUser={setUser}/>
      <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
      <CreateGame/>
      <GameList games={games}/>
    </ThemeProvider>
  );
};

export default App;