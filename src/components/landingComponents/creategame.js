import React, {useState} from 'react';
import {createGame} from '@/graphql/mutations';
import {API, Auth, withSSRContext, graphqlOperation} from "aws-amplify";
import {createPlayer} from '@/graphql/mutations';

const CreateGame = () => {
  const [gameName, setGameName] = useState('');


  const createPlayerForCurrentUser = async () => {
    try {
      // Get the current authenticated user
      const currentUser = await Auth.currentAuthenticatedUser();

      // Get the user ID of the current authenticated user
      const userId = currentUser.attributes.sub;
      console.log(`User Id ${userId}`)
      // Create the GamePlayer input object with the user ID
      const gamePlayerInput = {
        playerID: userId,
      };

      // Call the API to create the GamePlayer
      const newGamePlayer = await API.graphql(
        graphqlOperation(createGamePlayer, {input: gamePlayerInput})
      );

      console.log('New GamePlayer created:', newGamePlayer.data.createGamePlayer);
      return newGamePlayer.data.createGamePlayer;
    } catch (error) {
      console.error('Error creating the GamePlayer:', error);
      throw error;
    }
  };

  const handleCreateGame = async () => {
    try {
      console.log(gameName)
      const newGamePlayer = createGamePlayerForCurrentUser()

      const newGame = await API.graphql(
        graphqlOperation(createGame, {
          input: {
            name: gameName,
          },
        })
      );

      console.log('New game created:', newGame.data.createGame);
      return newGame.data.createGame;
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