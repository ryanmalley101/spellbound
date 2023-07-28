import React, {useEffect, useRef, useState} from 'react';
import DraggableIcon from "@/components/gameComponents/draggableicon";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../../styles/Battlemap.module.css";
import GridOverlay from "@/components/gameComponents/gridoverlay";
import ZoomSlider from "@/components/gameComponents/zoomslider";
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateToken, onDeleteToken, onUpdateGame, onUpdateToken} from "@/graphql/subscriptions";
import {shallow} from "zustand/shallow";
import {getExampleCharacter} from "@/5eReference/characterSheetGenerators";
import * as mutations from "@/graphql/mutations";
import {useDropzone} from 'react-dropzone';
import {Storage} from "aws-amplify";

const GRID_SIZE = 75


const BattleMap = () => {
  // Define your component logic here
  const [panning, setPanning] = useState(false);
  const panStartRef = useRef({x: 0, y: 0});
  const [mapPosition, setMapPosition] = useState({x: 0, y: 0});
  const [widthUnits, setWidthUnits] = useState(25);
  const [heightUnits, setHeightUnits] = useState(25);
  const zoomLevel = useBattlemapStore(state => state.zoomLevel)
  const setZoomLevel = useBattlemapStore(state => state.setZoomLevel)
  const {gameID, activeMap, setActiveMap} = useBattlemapStore();
  const mapTokens = useBattlemapStore((state) => state.mapTokens, shallow)
  const setMapTokens = useBattlemapStore((state) => state.setMapTokens, shallow)
  const addMapToken = useBattlemapStore((state) => state.addMapToken, shallow)
  const removeMapToken = useBattlemapStore((state) => state.removeMapToken, shallow)
  const updateMapToken = useBattlemapStore((state) => state.updateMapToken, shallow)
  const selectedTool = useBattlemapStore((state) => state.selectedTool);
  const selectedTokenID = useBattlemapStore((state) => state.selectedTokenID, shallow);
  const setSelectedTokenID = useBattlemapStore((state) => state.setSelectedTokenID, shallow);
  const [files, setFiles] = useState(null);

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

  const handleDragStart = (event) => {
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
  const handleMouseDown = (event) => {
    if (selectedTool === TOOL_ENUM.DRAG) {
      console.log("Panning")
      setPanning(true);
      panStartRef.current = {
        x: event.clientX / zoomLevel - mapPosition.x,
        y: event.clientY / zoomLevel - mapPosition.y,
      };
    }
  };

  const handleMouseMove = (event) => {
    if (panning) {
      const deltaX = (event.clientX / zoomLevel - panStartRef.current.x) * (1 / zoomLevel);
      const deltaY = (event.clientY / zoomLevel - panStartRef.current.y) * (1 / zoomLevel);
      setMapPosition((prevPos) => ({
        x: prevPos.x + deltaX,
        y: prevPos.y + deltaY,
      }));
      panStartRef.current = {
        x: event.clientX / zoomLevel,
        y: event.clientY / zoomLevel,
      };
    }
  };

  const handleMouseUp = () => {
    setPanning(false);
  };

  useEffect(() => {
    if (panning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [panning]);

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
      console.log(tokens)
      setMapTokens(tokens.reverse())
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
      console.log('Current Tokens:', mapTokens);
      updateMapToken(updatedToken)
      // console.log(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
      // setMapTokens(mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token))
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

  const handleDialogClick = (event) => {
    event.preventDefault()
  }

  return (
    // <div className={styles.battlemap} onWheel={handleWheel} onMouseDown={handleMouseDown} id={"battlemap"}>
    <div {...getRootProps({onClick: event => event.stopPropagation()})}
         style={{
           width: `${widthUnits * GRID_SIZE}px`,
           height: `${heightUnits * GRID_SIZE}x`,
           transform: `scale(${zoomLevel}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
           boxShadow: '0 0 0 2px black'
         }}>
      <input {...getInputProps()} />
      <div className={styles.mapContainer}
           style={{
             width: `${widthUnits * GRID_SIZE}px`,
             height: `${heightUnits * GRID_SIZE}px`,
             transform: `scale(${zoomLevel}) translate(${mapPosition.x}px, ${mapPosition.y}px)`
           }}
           onWheel={handleWheel} onMouseDown={handleMouseDown}>
        {mapTokens.map((token) => {
          return <DraggableIcon key={token.id} token={token}/>
        })}
        <div className={styles.mapImageContainer}>
          {/*<img src="/forest_battlemap.jpg" alt="Battle Map" className={styles.mapImage}/>*/}
        </div>
        <GridOverlay gridSize={GRID_SIZE}/>
      </div>
      {/*</div>*/}

      <ZoomSlider value={zoomLevel} onChange={handleZoomChange}/>
    </div>
  );
};


export default BattleMap;
