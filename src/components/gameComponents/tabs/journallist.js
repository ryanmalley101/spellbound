import React, {useEffect, useState} from "react";
import {Button, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useBattlemapStore from "@/stores/battlemapStore";
import {getExampleCharacter} from "@/5eReference/characterSheetGenerators";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {onCreateCharacterSheet} from "@/graphql/subscriptions";

const JournalList = () => {
    const characterSheetWindows = useBattlemapStore((state) => state.characterSheetWindows);
    const addCharacterSheetWindow = useBattlemapStore((state) => state.addCharacterSheetWindow);
    const [characterSheets, setCharacterSheets] = useState([]);
    const {gameID, playerID} = useBattlemapStore();

    const createCharacter = async () => {
        const input = getExampleCharacter(playerID, gameID);
        console.log("Creating a new character sheet");
        console.log(input);
        try {
            // Call the createCharacterSheet mutation
            const newCharacter = await API.graphql({
                query: mutations.createCharacterSheet,
                variables: {input: input},
            });

            console.log(newCharacter);
            setCharacterSheets([...characterSheets, newCharacter.data.createCharacterSheet]);
        } catch (error) {
            console.error("Error creating character sheet:", error);
        }
    };

    useEffect(() => {
        const retrieveCharacterSheets = async () => {
            const response = await API.graphql({
                query: `
          query GetGameCharacterSheets($id: ID!) {
            getGame(id: $id) {
              characterSheets {
                items {
                  id
                  name
                  players
                }
              }
            }
          }
        `,
                variables: {
                    id: gameID,
                },
            });

            console.log(response);
            setCharacterSheets(response.data.getGame.characterSheets.items.filter((sheet) => sheet.players.includes(playerID)));
        };
        retrieveCharacterSheets();
    }, [gameID]);

    useEffect(() => {
        const subscriptionHandler = (data) => {
            console.log("Created Character Sheet:", data);

            const newSheet = data.value.data.onCreateCharacterSheet;
            setCharacterSheets([...characterSheets, newSheet]);
        };

        const subscription = API.graphql(
            graphqlOperation(onCreateCharacterSheet, {gameCharacterSheetId: gameID}),
            {
                filter: {
                    mutationType: {
                        eq: "create",
                    },
                },
            }
        ).subscribe({
            next: (data) => {
                subscriptionHandler(data);
            },
            error: (error) => {
                console.error("Subscription Error:", error);
            },
        });
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    const showWindow = (sheet) => {
        console.log(characterSheetWindows);
        console.log(sheet);
        if (characterSheetWindows.filter((s) => s.id === sheet.id).length === 0) {
            addCharacterSheetWindow(sheet);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={createCharacter}>
                Create Character Sheet
            </Button>
            <Typography variant="h6" gutterBottom>
                Character Sheets
            </Typography>
            <List>
                {characterSheets.map((sheet) => (
                    <ListItemButton key={sheet.id} onClick={() => showWindow(sheet)}>
                        <ListItemText primary={sheet.name}/>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};

export default JournalList;
