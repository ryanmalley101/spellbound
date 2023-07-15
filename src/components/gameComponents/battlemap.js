import React, {useEffect, useState} from 'react';
import DraggableIcon from "@/components/gameComponents/draggableicon";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../../styles/Battlemap.module.css";
import GridOverlay from "@/components/gameComponents/gridoverlay";
import ZoomSlider from "@/components/gameComponents/zoomslider";
import useBattlemapStore from "@/stores/battlemapStore";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateToken, onUpdateGame, onUpdateToken} from "@/graphql/subscriptions";

const GRID_SIZE = 25


const BattleMap = () => {
  // Define your component logic here
  const zoomLevel = useBattlemapStore(state => state.zoomLevel)
  const setZoomLevel = useBattlemapStore(state => state.setZoomLevel)
  const battlemapTokens = useBattlemapStore(state => state.tokens)
  const {gameID, activeMap, setActiveMap} = useBattlemapStore();
  // const [activeMap, setActiveMap] = useState("");
  const [mapTokens, setMapTokens] = useState([]);

  const handleZoomChange = (event) => {
    const newZoomLevel = parseFloat(event.target.value);
    setZoomLevel(newZoomLevel);
  };

  const handleWheel = (event) => {
    const scaleFactor = 0.05; // Adjust the scale factor to control the zoom speed
    const delta = event.deltaY > 0 ? -1 : 1; // Determine scroll direction
    const newZoomLevel = zoomLevel + delta * scaleFactor;
    setZoomLevel(newZoomLevel);
  };

  useEffect(() => {
    const getActiveMap = async () => {
      const response = await API.graphql({
        query: `
        query GetGameMessageList($id: ID!) {
          getGame(id: $id) {
            activeMap
          }
        }
      `,
        variables: {
          id: gameID,
        },
      });
      console.log(response)
      const map = await getActiveMap()
      setActiveMap(map.data.getGame.activeMap)
      return activeMap
    }

  }, [])

  useEffect(() => {
    const fetchTokens = async () => {
      if (!activeMap) {
        console.log("No active map when fetching battlemap tokens")
        return null
      }
      console.log("Fetching battlemap tokens")
      console.log(`Active Map ${activeMap}`)
      const response = await API.graphql({
        query: `
        query GetMapTokens($id: ID!) {
          getMap(id: $id) {
            tokens {
              items {
                id
                imageURL
                scaleX
                scaleY
                rotation
                positionX
                positionY
              }
            }
          }
        }
      `,
        variables: {
          id: activeMap,
        },
      });

      console.log(response)
      const tokens = response.data?.getMap?.tokens?.items || [];
      console.log(tokens)
      setMapTokens(tokens)
    }

    fetchTokens()
    // const initialIcon = <DraggableIcon key={"unique"} imgsrc={"/rogue.png"} initialPosition={{x: 0, y: 0}}/>
    // addToken(initialIcon)

  }, [activeMap])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const newToken = data.value.data.onCreateToken;
      console.log('Created Token:', data);
      setMapTokens([...mapTokens, newToken])
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateToken, {mapTokensId: activeMap}),
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });
  }, [])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const updatedToken = data.value.data.onUpdateToken;
      console.log('Updated Token:', updatedToken);
      setMapTokens(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
    };

    const subscription = API.graphql(
      graphqlOperation(onUpdateToken, {mapTokensId: activeMap}),
      {
        filter: {
          mutationType: {
            eq: 'update',
          },
        },
      }
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });
  }, [])

  console.log("Map Tokens")
  console.log(mapTokens)

  return (
    <div className={styles.battlemap} onWheel={handleWheel} id={"battlemap"}>
      <div className={styles.mapContainer} style={{transform: `scale(${zoomLevel})`}}>
        {mapTokens.map((token) => {
          return <DraggableIcon key={token.id} token={token}/>
        })}
        <div className={styles.mapImageContainer}>
          <img src="/forest_battlemap.jpg" alt="Battle Map" className={styles.mapImage}/>
        </div>
        <GridOverlay gridSize={GRID_SIZE}/>
      </div>
      <ZoomSlider value={zoomLevel} onChange={handleZoomChange}/>
    </div>
  );
};


export default BattleMap;
