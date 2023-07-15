import React, {useState} from 'react';
import {createGame} from '@/graphql/mutations';
import {API, Auth, withSSRContext, graphqlOperation} from "aws-amplify";
import {createPlayer} from '@/graphql/mutations';
import {useRouter} from "next/router";
import {v4 as uuidv4} from 'uuid';

const CreateGame = ({user}) => {
  const [gameName, setGameName] = useState('');
  const router = useRouter();


  const handleCreateGame = async () => {
    const playerID = uuidv4()

    try {
      console.log(user.attributes)
      const userID = user.attributes.sub;
      const username = user.username
      console.log(gameName)
      console.log(userID)
      const input = {
        gameName: gameName,
        ownerId: userID,
        username: username
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
          input
        },
      });

      // The response will contain the created game data
      console.log('New game created:', response.data.createNewGame);
      await router.push(`/game/${response.data.createNewGame.id}`); // Redirect to the dashboard page after successful login

      return response.data.createGame;
    } catch (error) {
      console.error('Error creating the game:', error);
      throw error;
    }
  };

  return (
    <div>
      <h2>Create New Game</h2>
      <input
        type="text"
        placeholder="Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <button onClick={handleCreateGame}>Create Index</button>
    </div>)
}

export default CreateGame