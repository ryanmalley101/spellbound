import React, {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import {useRouter} from "next/router";
import {getGame} from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";

function JoinGameID() {
  const [gameID, setGameID] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter();
  const idQuery = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
        router.push('/')
      }
    };
    fetchUser()
  }, [])

  useEffect(() => {
    const initialFetch = async () => {
      console.log(`ID Query`)
      console.log(idQuery.gameID)

      setGameID(idQuery.gameID)
      console.log(`Post set gameID`)
      console.log(gameID)
    }
    if (!idQuery) return
    initialFetch()
  }, [router.isReady])

  useEffect(() => {
    if (!gameID) return
    joinGame()
  }, [gameID])

  const joinGame = async () => {
    if (gameID) {
      console.log(`Fetch game gameID`)
      console.log(gameID)
      try {
        const gamesReq = await API.graphql({
          query: getGame,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {id: gameID}
        });
        console.log(gamesReq.data.getGame)
        console.log(user)

        if (user && gameID) {
          const input = {
            name: user.username,
            gamePlayersId: gameID,
            userPlayersId: user.attributes.sub
          }
          console.log("Creating a new player to join game", gameID);
          console.log(input);

          // Call the createMap mutation
          const newPlayer = await API.graphql({
            query: mutations.createPlayer,
            variables: {input: input},
          });

          console.log(newPlayer);
          router.push(`/game/${gameID}`)
        }
      } catch (e) {
        console.log(e)
        await router.push('/')
      }
    }
  }
  return <p>Loading...</p>

}

// export default Home;
export default JoinGameID;
