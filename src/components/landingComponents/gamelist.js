import React, {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {listGamesMetadata} from "@/graphql/customQueries";
import {Button, Typography} from "@mui/material";
import {useRouter} from "next/router";


const getGameIdQuery =
  `query GetGameIDsForUser($userID: ID!) {
  getUser(id: $userID) {
    id
    username
    players {
      items {
        id
        name
        gamePlayersId
      }
    }
  }
}
`

const GameList = ({user}) => {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const launchGame = (gameID) => {
    router.push(`/game/${gameID}`);
  };

  useEffect(() => {
    const getGames = async () => {
      console.log("getting games")
      if (!user) {
        console.log("No user sent to the GameList component")
      } else {
        const userID = user.attributes.sub
        console.log(userID)
        try {
          const gamesReq = await API.graphql({
            query: getGameIdQuery,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {userID: userID}
          });
          console.log(gamesReq)
          console.log(...gamesReq.data.getUser.players.items)
          setGames([...gamesReq.data.getUser.players.items])
        } catch (error) {
          console.error(error)
        }
      }
    };
    if (!user) return

    getGames()
  }, [user])

  if (!user || !games) {
    return null;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Your Games
      </Typography>
      <ul style={{listStyle: "none", padding: 0}}>
        {games.map((game) => (
          <li key={game.id} style={{marginBottom: "10px"}}>
            <Button
              variant="contained"
              onClick={() => launchGame(game.id)}
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.2s ease-in-out",
                width: "100%",
              }}
            >
              Launch {game.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
