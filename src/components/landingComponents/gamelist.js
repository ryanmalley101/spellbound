import React, {useEffect, useState} from 'react';
import {API} from "aws-amplify";
import {listGames, listMessages} from "@/graphql/queries";
import {listGamesMetadata} from "@/graphql/customQueries";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

const GameList = ({user}) => {
  const [games, setGames] = useState([])
  const router = new useRouter()
  const launchGame = (gameID) => {
    router.push(`/game/${gameID}`)
  }

  useEffect(() => {
    const getGames = async () => {
      console.log("getting games")
      if (!user) {
        console.log("No user sent to the GameList component")
      } else {
        const userId = user.attributes.sub;
        console.log(userId)
        try {
          const gamesReq = await API.graphql({
            query: listGamesMetadata,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            filter: {
              gameOwnerId: userId
            }
          });
          console.log(gamesReq)
          console.log(...gamesReq.data.listGames.items)
          setGames([...gamesReq.data.listGames.items]);
        } catch (error) {
          console.error(error);
        }
      }
    }
    getGames();
  }, [user])

  if (!user || !games) {
    return null
  }
  return (
    <div>
      <h2>Your Games</h2>
      <ul>
        {games.map((game) => (
          <Button key={game.id} onClick={() => launchGame(game.id)}>Launch {game.name}</Button>
        ))}
      </ul>
    </div>
  );
};

export default GameList;