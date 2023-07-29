import React, {useEffect, useRef, useState} from 'react';
import DraggableIcon from "@/components/gameComponents/draggableicon";
import styles from "../../styles/Battlemap.module.css";
import GridOverlay from "@/components/gameComponents/gridoverlay";
import ZoomSlider from "@/components/gameComponents/zoomslider";
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {onCreateToken, onDeleteToken, onUpdateGame} from "@/graphql/subscriptions";
import * as mutations from "@/graphql/mutations";
import {useDropzone} from 'react-dropzone';
import {Rnd} from "react-rnd";
import {throttle} from "lodash";

const GRID_SIZE = 75


const BattleMap = () => {
  // Define your component logic here
  const [panning, setPanning] = useState(false);
  const panStartRef = useRef({x: 0, y: 0});
  const [mapPosition, setMapPosition] = useState({x: 0, y: 0});
  const [widthUnits, setWidthUnits] = useState(25);
  const [heightUnits, setHeightUnits] = useState(25);
  const [mapTokens, setMapTokens] = useState([])
  const mapPositionRef = useRef({x: 0, y: 0});

  const {
    zoomLevel, setZoomLevel, selectedTool, selectedTokenID, setSelectedTokenID,
    mapLayer, setMapLayer, gameID, activeMap, setActiveMap
  } = useBattlemapStore();
  // Add a ref to the draggable component
  const draggableRef = useRef(null);

  // Add a ref to store the current position during dragging
  const dragStartRef = useRef({x: 0, y: 0});

  // Add a ref to store the previous position during dragging
  const prevDragRef = useRef({x: 0, y: 0});

  // Throttle the mousemove event to avoid excessive updates


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

  // const [mapTokens, setMapTokens] = useState([]);
  // const handleMouseDown = (event) => {
  //   if (selectedTool === TOOL_ENUM.DRAG) {
  //     console.log("Panning")
  //     setPanning(true);
  //     panStartRef.current = {
  //       x: event.clientX / zoomLevel - mapPosition.x,
  //       y: event.clientY / zoomLevel - mapPosition.y,
  //     };
  //   }
  // };
  //
  // const handleMouseMove = (event) => {
  //   if (panning) {
  //     const deltaX = (event.clientX / zoomLevel - panStartRef.current.x) * (1 / zoomLevel);
  //     const deltaY = (event.clientY / zoomLevel - panStartRef.current.y) * (1 / zoomLevel);
  //     setMapPosition((prevPos) => ({
  //       x: prevPos.x + deltaX,
  //       y: prevPos.y + deltaY,
  //     }));
  //     panStartRef.current = {
  //       x: event.clientX / zoomLevel,
  //       y: event.clientY / zoomLevel,
  //     };
  //   }
  // };
  //
  // const handleMouseUp = () => {
  //   setPanning(false);
  // };
  //
  // useEffect(() => {
  //   if (panning) {
  //     document.addEventListener('mousemove', handleMouseMove);
  //     document.addEventListener('mouseup', handleMouseUp);
  //   } else {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //   }
  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [panning]);

  // useEffect(() => {
  // console.log("Pan Start", panStart)
  // console.log("Map Position", mapPosition)
  // }, [panStart, mapPosition]);


  // const [mapTokens, setMapTokens] = useState([]);

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

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const newToken = data.value.data.onCreateToken;
      console.log('Created Token:', data);
      // console.log([...mapTokens, newToken])
      // setMapTokens([...mapTokens, newToken])
      addMapToken(newToken)
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateToken, {mapTokensId: activeMap}),
      {
        filter: {
          mutationType: {
            eq: 'create',
          },
        },
      },
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
  }, [])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const updatedToken = data.value.data.onUpdateToken;
      console.log('Updated Token:', updatedToken);
      console.log('Current Tokens:', mapTokens); // Use the mutable ref here
      updateMapToken(updatedToken)
      // console.log(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
      // setMapTokens(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
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
        // Provide the variables as the second argument
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


    //     const subscription = API.graphql(
    //   graphqlOperation(onUpdateToken, {mapTokensId: activeMap}),
    //   {
    //     filter: {
    //       mutationType: {
    //         eq: 'update',
    //       },
    //     },
    //   }
    // ).subscribe({
    //   next: (data) => {
    //     subscriptionHandler(data);
    //   },
    //   error: (error) => {
    //     console.error('Subscription Error:', error);
    //   },
    // });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const deletedToken = data.value.data.onDeleteToken;
      console.log('Deleted Token:', deletedToken);
      console.log('Current Tokens:', mapTokens);
      removeMapToken(deletedToken)
      // console.log(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
      // setMapTokens(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
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
  }, [])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      console.log("got game update")
      console.log(data)
      const updatedActiveMap = data.value.data.onUpdateGame.activeMap;
      console.log('Updated Active Map:', updatedActiveMap);
      // console.log([...mapTokens, newToken])
      // setMapTokens([...mapTokens, newToken])
      setActiveMap(updatedActiveMap)
    };

    const subscription = API.graphql(
      graphqlOperation(onUpdateGame, {id: gameID}),
      {
        filter: {
          mutationType: {
            eq: 'update',
          },
        },
      },
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });


  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default right-click context menu behavior
  };

  const handleDragStart = () => {
    const {x, y} = mapPositionRef.current;
    dragStartRef.current = {x, y};
    prevDragRef.current = {x, y};
  };

  const handleDragStop = async (e, d) => {
    console.log('Handling drag stop')
    const {x, y} = d;
    const dragStart = dragStartRef.current;

    if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {

      const adjustedX = parseFloat((x).toFixed(1))
      const adjustedY = parseFloat((y).toFixed(1))
      setMapPosition({x: adjustedX, y: adjustedY});
    }

    dragStartRef.current = null;
  };

  const handleMouseMoveThrottled =
    throttle((event) => {
      // console.log("Handling mouse move throttled")
      // console.log(event)
      const deltaX = (event.clientX / zoomLevel - dragStartRef.current.x) * (1 / zoomLevel);
      const deltaY = (event.clientY / zoomLevel - dragStartRef.current.y) * (1 / zoomLevel);

      // setMapPosition(newPos);
      prevDragRef.current = {
        x: prevDragRef.current.x + deltaX,
        y: prevDragRef.current.y + deltaY,
      };
    }, 16) // 60 FPS (1000ms / 60 = 16.67ms)


  if (mapTokens !== null) {
    return (
      // <div className={styles.battlemap} onWheel={handleWheel} onMouseDown={handleMouseDown} id={"battlemap"}>
      <Rnd
        ref={draggableRef}
        size={{width: (GRID_SIZE * widthUnits) * zoomLevel, height: (GRID_SIZE * heightUnits) * zoomLevel}}
        scale={zoomLevel}// Set the initial size of the draggable and resizable component
        position={{x: mapPosition.x, y: mapPosition.y}} // Set the initial position of the component
        onDragStart={handleDragStart}
        // onMouseMove={handleMouseMoveThrottled}
        onDragStop={handleDragStop}
        disableDragging={selectedTool !== TOOL_ENUM.DRAG}
        style={{zIndex: 10000}}
        bounds="parent"
        // className={styles.mapContainer}
      >
        <div {...getRootProps({onClick: event => event.stopPropagation()})}
             style={{
               width: `${widthUnits * GRID_SIZE}px`,
               height: `${heightUnits * GRID_SIZE}px`,
               transform: `scale(${zoomLevel})`,
               boxShadow: '0 0 0 2px black'
             }}
             onWheel={handleWheel}
             onContextMenu={handleContextMenu}
             className={styles.mapContainer}>
          <input {...getInputProps()} />
          {mapTokens.map((token, index) => {
            // const uniqueKey = `${token.id}_${Date.now()}`; // Add the current timestamp to the key
            return <DraggableIcon key={`${token.key}`} token={token}/>
          })}
          <div className={styles.mapImageContainer}>
            {/*<img src="/forest_battlemap.jpg" alt="Battle Map" className={styles.mapImage}/>*/}
          </div>
          <GridOverlay gridSize={GRID_SIZE}/>
          {/*</div>*/}
          <ZoomSlider value={zoomLevel} onChange={handleZoomChange}/>
        </div>
      </Rnd>
    );
  }
};

export default BattleMap;
