import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import {Container, ThemeProvider} from "@mui/material";
import themeOptions from "@/themes/muitheme";
import LandingMenuBar from "@/components/landingComponents/landingmenubar";
import GameList from "@/components/landingComponents/gamelist";
import CreateGame from "@/components/landingComponents/creategame";
import "@aws-amplify/ui-react/styles.css";
import SpellboundIntro from "@/components/landingComponents/spellboundIntro";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const amplifyUser = await Auth.currentAuthenticatedUser();
                setUser(amplifyUser);
                console.log(user);
            } catch (err) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <ThemeProvider theme={themeOptions}>
            <LandingMenuBar user={user} setUser={setUser}/>
            <Container
                maxWidth="md" // Adjust the maxWidth value as per your design preference
                sx={{padding: "20px", marginTop: "20px"}}
            >
                <SpellboundIntro/>
                {user && <CreateGame user={user}/>}
                {user && <GameList user={user}/>}
            </Container>
        </ThemeProvider>
    );
};

export default App;
