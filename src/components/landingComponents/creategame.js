import React, {useState} from "react";
import {API} from "aws-amplify";
import {useRouter} from "next/router";
import {v4 as uuidv4} from "uuid";
import {Button, Typography} from "@mui/material";

const CreateGame = ({user}) => {
  const [gameName, setGameName] = useState("");
  const router = useRouter();

  const handleCreateGame = async () => {
    const playerID = uuidv4();

    try {
      console.log(user.attributes);
      const userID = user.attributes.sub;
      const username = user.username;
      console.log(gameName);
      console.log(userID);
      const input = {
        gameName: gameName,
        ownerId: userID,
        username: username,
      };

      // Call the createNewGame mutation
      const response = await API.graphql({
        query: `
          mutation CreateNewGame($input: CreateNewGameInput!) {
            createNewGame(input: $input) {
              id
            }
          }
        `,
        variables: {
          input,
        },
      });

      // The response will contain the created game data
      console.log("New game created:", response.data.createNewGame);
      await router.push(`/game/${response.data.createNewGame.id}`); // Redirect to the dashboard page after successful login

      return response.data.createGame;
    } catch (error) {
      console.error("Error creating the game:", error);
      throw error;
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Create New Game
      </Typography>
      <div style={{display: "flex", alignItems: "center"}}>
        <input
          type="text"
          placeholder="Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            flexGrow: 1,
          }}
        />
        <Button
          variant="contained"
          onClick={handleCreateGame}
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "12px 24px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Create Game
        </Button>
      </div>
    </div>
  );
};

export default CreateGame;
