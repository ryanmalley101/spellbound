import React, {useEffect, useRef, useState} from 'react';
import DraggableIcon from '@/components/gameComponents/draggableicon';
import styles from '../../styles/Battlemap.module.css';
import GridOverlay from '@/components/gameComponents/gridoverlay';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {onCreateToken, onDeleteToken, onUpdateToken, onUpdateGame} from '@/graphql/subscriptions';
import * as mutations from '@/graphql/mutations';
import {TransformWrapper, TransformComponent, useControls} from 'react-zoom-pan-pinch';
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";


const GRID_SIZE = 25


const BattleMap = () => {

  const [draggingDisabled, setDraggingDisabled] = useState(true);

  const [widthUnits, setWidthUnits] = useState(25);
  const [heightUnits, setHeightUnits] = useState(25);
  const [mapTokens, setMapTokens] = useState([])
  const [scale, setScale] = useState(1);

  const {
    zoomLevel, setZoomLevel, selectedTool, selectedTokenID, setSelectedTokenID,
    mapLayer, setMapLayer, gameID, activeMap, setActiveMap
  } = useBattlemapStore();


  const removeMapToken = (deletedToken) => {
    console.log("removing map token")
    setMapTokens(mapTokens.filter((token) => token.id !== deletedToken.id))
  }

  const addMapToken = (newToken) => {
    console.log("adding map token")
    setMapTokens([...mapTokens, newToken])
  }

  const updateMapToken = (updatedToken) => {
    console.log("Updating map tokens");
    console.log(mapTokens);

    setMapTokens((prevTokens) =>
      prevTokens.map((token) => {
          if (token.id === updatedToken.id) {
            return {...updatedToken, key: `${updatedToken.id}_${Date.now()}`}
          }
          return token
        }
      )
    );

    // You can access the updated mapTokens directly here:
    console.log("Updated Map Tokens", mapTokens);
  };

  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      console.log(file)
      // Generate a unique key for the uploaded file in the S3 bucket
      const key = `images/${Date.now()}_${file.name}`;

      // Upload the file to S3 using Amplify's Storage API
      const putFile = await Storage.put(key, file, {
        contentType: file.type,
        level: 'public', // Set the appropriate level based on your S3 bucket's permissions
      });

      console.log(putFile)

      const addToken = async (path) => {
        const input = {
          imageURL: path,
          mapTokensId: activeMap,
          layer: mapLayer,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          width: 50,
          height: 50
        };

        console.log(path)
        // Call the createNewGame mutation
        const newToken = await API.graphql({
          query: mutations.createToken,
          variables: {input: input}
        });

        console.log("Creating a new token")
        console.log(newToken)
      }

      addToken('/' + putFile.key)

      // Optionally, you can trigger an event here to notify the parent component about the successful upload.
    } catch (error) {
      console.error('Error uploading the file:', error);
      // Handle any errors that occur during the upload process.
    }
  };

  const handleFileDrag = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id)
  }

  const deleteSelectedToken = async (tokenID) => {
    console.log("Deleting selected token", tokenID);
    if (tokenID) {
      try {
        const deletedToken = await API.graphql({
          query: mutations.deleteToken,
          variables: {input: {id: tokenID}},
        });
        console.log("deleted token", deletedToken);
        setSelectedTokenID(""); // Clear the selectedTokenID here if needed
      } catch (error) {
        console.error("Error deleting token:", error);
      }
    }
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' && !['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
        deleteSelectedToken(selectedTokenID); // Pass the selectedTokenID as an argument
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteSelectedToken, selectedTokenID]);

  const handleWheel = (event) => {
    const scaleFactor = 0.05; // Adjust the scale factor to control the zoom speed
    const delta = event.deltaY > 0 ? -1 : 1; // Determine scroll direction
    const newZoomLevel = zoomLevel + delta * scaleFactor;
    setZoomLevel(newZoomLevel);
  };

  const addTokenLayer = async (token) => {
    console.log(`No layer for token fetched from backend, adding layer ${mapLayer}`)
    const updatedToken = {...token, layer: mapLayer}
    console.log(updatedToken)
    try {
      const layeredToken = await API.graphql({
        query: mutations.updateToken,
        variables: {input: updatedToken}
      });
    } catch (e) {
      console.log("error adding layer to token")
      console.log(e)
    }
  }

  useEffect(() => {
    console.log("Zoom level", zoomLevel)
    const getActiveMap = async () => {
      const response = await API.graphql({
        query: `
        query GetGameActiveMap($id: ID!) {
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
            sizeX
            sizeY
            tokens {
              items {
                id
                imageURL
                width
                height
                rotation
                positionX
                positionY
                layer
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
      setWidthUnits(response.data.getMap.sizeX)
      setHeightUnits(response.data.getMap.sizeY)
      const tokens = response.data.getMap.tokens.items
      tokens.map((token) => token.key = token.id)
      console.log(tokens)
      setMapTokens(tokens.reverse())


      tokens.map((token) => {
        if (!token.layer) {
          addTokenLayer(token)
        }
      })
    }

    fetchTokens()
    // const initialIcon = <DraggableIcon key={"unique"} imgsrc={"/rogue.png"} initialPosition={{x: 0, y: 0}}/>
    // addToken(initialIcon)

  }, [activeMap])

  // Separate subscription functions
  const subscribeToTokenCreation = () => {
    const subscriptionHandler = (data) => {
      const newToken = data.value.data.onCreateToken;
      addMapToken(newToken);
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateToken, {mapTokensId: activeMap}),
      {
        filter: {
          mutationType: {
            eq: 'create',
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

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  const subscribeToTokenUpdate = () => {
    const subscriptionHandler = (data) => {
      const updatedToken = data.value.data.onUpdateToken;
      updateMapToken(updatedToken);
    };

    const subscription = API.graphql(
      graphqlOperation(`
        subscription OnMapTokenUpdate($filter: ModelSubscriptionTokenFilterInput) {
          onUpdateToken(filter: $filter) {
            id
            imageURL
            width
            height
            rotation
            positionX
            positionY
            layer
          }
        }
      `),
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

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  const subscribeToTokenDeletion = () => {
    const subscriptionHandler = (data) => {
      const deletedToken = data.value.data.onDeleteToken;
      removeMapToken(deletedToken);
    };

    const subscription = API.graphql(
      graphqlOperation(onDeleteToken, {mapTokensId: activeMap}),
      {
        filter: {
          mutationType: {
            eq: 'delete',
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

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  const subscribeToGameUpdate = () => {
    const subscriptionHandler = (data) => {
      const updatedActiveMap = data.value.data.onUpdateGame.activeMap;
      setActiveMap(updatedActiveMap);
    };

    const subscription = API.graphql(
      graphqlOperation(onUpdateGame, {id: gameID}),
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

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  // Whenever there is a new activeMap loaded, resubscribe to token creations and game updates
  useEffect(() => {
    // Other existing useEffect logic...

    // Subscribe to different events
    const unsubscribeToCreation = subscribeToTokenCreation();
    const unsubscribeToUpdate = subscribeToTokenUpdate();
    const unsubscribeToDelete = subscribeToTokenDeletion();
    const unsubscribeToGameUpdate = subscribeToGameUpdate();

    // Clean up subscriptions
    return () => {
      unsubscribeToCreation();
      unsubscribeToUpdate();
      unsubscribeToDelete();
      unsubscribeToGameUpdate();
    };
  }, [activeMap]);

  useEffect(() => {

    setDraggingDisabled(selectedTool !== TOOL_ENUM.DRAG)


  }, [selectedTool])

  const Controls = () => {
    const {zoomIn, zoomOut, resetTransform} = useControls();
    return (
      <>
        <button onClick={() => zoomIn()}>Zoom In</button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <button onClick={() => resetTransform()}>Reset</button>
      </>
    );
  };

  return (
    <div id={"Battlemap Start"} style={{height: '100%', width: '100%', position: 'relative'}}>
      <TransformWrapper style={{height: '100%', width: '100%'}} className={styles.mapContainer}
                        disabled={draggingDisabled} minScale={0.1} initialScale={scale}
                        onZoomEnd={(event) => {
                          setScale(event.scale);
                        }}>
        <Controls/>
        <TransformComponent wrapperStyle={{
          height: '100%',
          width: '100%',
        }} contentStyle={{
          height: '100%',
          width: '100%',
        }} disabled={draggingDisabled} minScale={0.1}>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            {mapTokens.map((token, index) => (
              <DraggableIcon key={`${token.key}`} token={token} scale={scale}/>
            ))}
            <GridOverlay style={{zIndex: -100}} gridSize={25}/>

          </div>
        </TransformComponent>
      </TransformWrapper>

    </div>
  );

};

export default BattleMap;
