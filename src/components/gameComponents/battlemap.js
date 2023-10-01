import React, {useEffect, useRef, useState} from 'react';
import DraggableIcon from '@/components/gameComponents/mapElements/draggableicon';
import styles from '../../styles/Battlemap.module.css';
import GridOverlay from '@/components/gameComponents/mapElements/gridoverlay';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {onCreatePing, onCreateToken, onDeleteToken, onUpdateGame} from '@/graphql/subscriptions';
import * as mutations from '@/graphql/mutations';
import {TransformComponent, TransformWrapper, useControls} from 'react-zoom-pan-pinch';
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import Ping from "@/components/gameComponents/mapElements/ping";
import {v4} from "uuid";
import {useDropzone} from 'react-dropzone'
import DrawingCanvas from "@/components/gameComponents/mapElements/drawingcanvas";
import {Layer, Stage} from "react-konva";

const GRID_SIZE = 70


const BattleMap = () => {

    const [draggingDisabled, setDraggingDisabled] = useState(true);
    const [selectingDisabled, setSelectingDisabled] = useState(false)
    const [widthUnits, setWidthUnits] = useState(25);
    const [heightUnits, setHeightUnits] = useState(25);
    const [mapTokens, setMapTokens] = useState(['debug'])
    const [isDraggingFile, setIsDraggingFile] = useState(false)

    const windowPositionRef = useRef({x: 0, y: 0})
    const scale = useRef(1)
    const [pings, setPings] = useState([])
    const initialMousePositionRef = useRef(null)
    const mouseDownTimeRef = useRef(null);
    const mouseReleasedRef = useRef(false);
    const currentMousePositionRef = useRef({x: 0, y: 0});

    let dragHandle
    const body = document.body
    body.addEventListener("dragover", (e) => {
        setIsDraggingFile(true)
        clearTimeout(dragHandle);
        console.log("Dragging File Over Screen")
        dragHandle = setTimeout(() => {
            setIsDraggingFile(false)
        }, 200);
    });

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
                    type: "image",
                    imageURL: path,
                    mapTokensId: activeMap,
                    layer: mapLayer,
                    x: 0,
                    y: 0,
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

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true, disabled: !isDraggingFile})

    const {
        zoomLevel, setZoomLevel, selectedTool, selectedTokenID, setSelectedTokenID,
        mapLayer, setMapLayer, gameID, activeMap, setActiveMap, playingSong, setPlayingSong, setIsSongPlaying
    } = useBattlemapStore();

    useEffect(() => {

        const handleMouseDown = async (event) => {

            console.log("MouseDown")
            initialMousePositionRef.current = {
                x: (event.clientX),
                y: (event.clientY)
            }
            currentMousePositionRef.current = {
                x: event.clientX,
                y: event.clientY,
            };

            mouseDownTimeRef.current = Date.now()
            mouseReleasedRef.current = false

            // Automatically call handleClick after 1 second
            setTimeout(async () => {
                console.log("Timeout", mouseReleasedRef.current)
                if (!mouseReleasedRef.current) {
                    await handleMapClick(event)
                }
            }, 600);
        };

        const handleMouseMove = (event) => {
            currentMousePositionRef.current = {
                x: event.clientX,
                y: event.clientY,
            };
        };

        const handleMouseUp = () => {
            console.log("Handle mouse up")
            mouseReleasedRef.current = true
            // mouseDownTimeRef.current = null
            // Clear the timeout if the mouse is released before 1 second
            // clearTimeout();
        };

        const handleMapClick = async (event) => {
            console.log("Handling map click", event, windowPositionRef.current, scale.current)
            if (!mouseReleasedRef.current && mouseDownTimeRef.current) {
                const clickEndTime = new Date();
                const timeDifference = clickEndTime - mouseDownTimeRef.current;
                if (timeDifference >= 500) {
                    const isMouseStationary = (
                        initialMousePositionRef.current.x === currentMousePositionRef.current.x &&
                        initialMousePositionRef.current.y === currentMousePositionRef.current.y
                    );

                    if (isMouseStationary) {
                        console.log("Creating a ping")

                        // // Perform the GraphQL mutation to create a Ping object
                        // const x = event.clientX;
                        // const y = event.clientY;

                        const deconstructedX = (event.clientX - 75 - windowPositionRef.current.x) / scale.current
                        const deconstructedY = (event.clientY - 20 - windowPositionRef.current.y) / scale.current
                        // Update this with the current scale value from state
                        const pingInput = {
                            gamePingsId: gameID,
                            x: deconstructedX,
                            y: deconstructedY,
                            scale: zoomLevel,
                            ttl: Math.floor((Date.now() / 1000)) + 60
                        };
                        console.log(pingInput)
                        try {
                            const response = await API.graphql({
                                query: mutations.createPing,
                                variables: {input: pingInput},
                            });
                            console.log("Created Ping object:", response);
                        } catch (error) {
                            console.error("Error creating Ping object:", error);
                        }
                    } else {
                        console.log("Mouse wasn't stationary during press")
                    }
                }
            }
        };

        // Attach the event listener to the map container
        const mapContainer = document.getElementById("Battlemap Start");
        if (mapContainer) {
            mapContainer.addEventListener("mousedown", handleMouseDown);
            mapContainer.addEventListener("mouseup", handleMouseUp);
            mapContainer.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            // Remove the event listeners when the component is unmounted
            if (mapContainer) {
                mapContainer.addEventListener("mousemove", handleMouseMove);
                mapContainer.removeEventListener("mousedown", handleMouseDown);
                mapContainer.removeEventListener("mouseup", handleMouseUp);
            }
        };
    }, []);

    const removeMapToken = (deletedToken) => {
        console.log("removing map token")
        setMapTokens(oldMapTokens => oldMapTokens.filter((token) => {
            console.log(token, deletedToken)
            if (token.id !== deletedToken.id) {
                return token
            }
        }))
    }

    const addMapToken = (newToken) => {
        console.log("adding map token")
        setMapTokens(oldMapTokens => [...oldMapTokens, newToken])
    }

    const updateMapToken = (updatedToken) => {
        console.log("Updating map tokens");
        // console.log(mapTokens);
        console.log(updatedToken)
        console.log(mapTokens)
        setMapTokens((oldTokens) => {
            return oldTokens.map((token) => {
                if (token.id === updatedToken.id) {
                    console.log(token, updatedToken)
                    return {...updatedToken}
                }
                return token
            })
        })
        // // You can access the updated mapTokens directly here:
        // console.log("Updated Map Tokens", mapTokens);
    };

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
                key
                imageURL
                width
                height
                rotation
                x
                y
                layer
                type
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
            key
            imageURL
            width
            height
            rotation
            x
            y
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
            console.log("Delete Token Subscription")
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
        const subscriptionHandler = async (data) => {
            console.log("Updated game ", data)

            const updatedActiveMap = data.value.data.onUpdateGame.activeMap
            const updatedPlayingSong = data.value.data.onUpdateGame.activeSong
            const isPlayingSong = data.value.data.onUpdateGame.songPlaying

            setActiveMap(updatedActiveMap)
            setIsSongPlaying(isPlayingSong)

            if (playingSong !== updatedPlayingSong && data.value.data.onUpdateGame.playingSong) {
                const newSong = await Storage.get('music/' + updatedPlayingSong, {
                    level: 'protected',
                    identidyId: '253A4971ef34-3da5-4205-87cc-ca1cbcd4a019'
                })
                console.log(playingSong)
                setPlayingSong(newSong)
            }
        }

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


    const subscribeToPingCreation = () => {
        const subscriptionHandler = (data) => {
            console.log(data, windowPositionRef.current, scale.current)
            const newPing = {...data.value.data.onCreatePing};
            const reconstructedX = (newPing.x * scale.current) + 75 + windowPositionRef.current.x
            const reconstructedY = (newPing.y * scale.current) + 20 + windowPositionRef.current.y
            console.log("Got a ping", newPing, reconstructedX, reconstructedY)

            newPing.x = reconstructedX
            newPing.x = reconstructedY
            // Draw the circle at (reconstructedX, reconstructedY)

            setPings((prevPings) => [...prevPings, newPing]);
            // Automatically call handleClick after 1 second
            setTimeout(async () => {
                setPings((prevPings) => prevPings.filter((ping) => ping.x !== reconstructedX && ping.y !== reconstructedY));

            }, 3000);
        };

        const subscription = API.graphql(
            graphqlOperation(onCreatePing, {gamePingsID: gameID}),
            {
                filter: {
                    mutationType: {
                        eq: "create",
                    },
                },
            }
        ).subscribe({
            next: (data) => {
                subscriptionHandler(data);
            },
            error: (error) => {
                console.error("Subscription Error:", error);
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
        // Subscribe to different events
        const unsubscribeToTokenCreation = subscribeToTokenCreation();
        const unsubscribeToTokenUpdate = subscribeToTokenUpdate();
        const unsubscribeToTokenDelete = subscribeToTokenDeletion();
        const unsubscribeToGameUpdate = subscribeToGameUpdate();
        const unsubscribeToPingCreation = subscribeToPingCreation();

        // Clean up subscriptions
        return () => {
            unsubscribeToTokenCreation();
            unsubscribeToTokenUpdate();
            unsubscribeToTokenDelete();
            unsubscribeToGameUpdate();
            unsubscribeToPingCreation();

        };
    }, [activeMap]);

    useEffect(() => {
        console.log(selectedTool)
        setDraggingDisabled(selectedTool !== TOOL_ENUM.DRAG)
        setSelectingDisabled(selectedTool !== TOOL_ENUM.SELECT)
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
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedTokenID(null);
        }
    };

    return (
        <div id={"Battlemap Start"}
             className={styles.battlemap}>
            <TransformWrapper style={{height: '100%', width: '100%'}} className={styles.mapContainer}
                              disabled={draggingDisabled} minScale={0.1} initialScale={scale.current}
                              onTransformed={(ref) => {
                                  windowPositionRef.current = {x: ref.state.x, y: ref.state.y}
                                  scale.current = ref.state.scale
                              }} limitToBounds={false}>

                {pings.map((ping) => (
                    <Ping key={v4()} x={ping.x} y={ping.y}/>
                ))}
                {/*<Controls/>*/}
                <TransformComponent wrapperStyle={{
                    height: '100%',
                    width: '100%',
                }} contentStyle={{
                    height: '100%',
                    width: '100%',
                }} minScale={0.1}>
                    <div
                        style={{width: widthUnits * GRID_SIZE, height: heightUnits * GRID_SIZE, flex: "none"}}
                    >
                        <div className={styles.fileDropZone}
                             style={{pointerEvents: isDraggingFile ? "auto" : "none"}}{...getRootProps()}>
                            <input {...getInputProps()} />
                        </div>
                        <DrawingCanvas windowPositionRef={windowPositionRef} scale={scale} mapTokens={mapTokens}
                                       widthUnits={widthUnits} heightUnits={heightUnits} GRID_SIZE={GRID_SIZE}/>
                        {/*<Stage width={widthUnits * GRID_SIZE} height={heightUnits * GRID_SIZE}*/}
                        {/*       onMouseDown={checkDeselect} onTouchStart={checkDeselect}*/}
                        {/*  style={{pointerEvents: selectingDisabled ? "none" : "auto"}}*/}
                        {/*>*/}
                        {/*  <Layer>*/}
                        {/*{mapTokens.map((token, index) => {*/}
                        {/*  if (token.layer === "MAP") {*/}
                        {/*    // console.log(token.key)*/}
                        {/*    return <DraggableIcon key={token.key} x={token.x} y={token.y}*/}
                        {/*                          token={token}*/}
                        {/*                          scale={scale.current}/>*/}
                        {/*  }*/}
                        {/*})}*/}
                        {/*<GridOverlay width={widthUnits * GRID_SIZE} height={heightUnits * GRID_SIZE}*/}
                        {/*             gridSize={GRID_SIZE}/>*/}
                        {/*{mapTokens.map((token, index) => {*/}
                        {/*  if (token.layer === "TOKEN") {*/}
                        {/*    return <DraggableIcon key={token.key} x={token.x} y={token.y}*/}
                        {/*                          token={token}*/}
                        {/*                          scale={scale.current}/>*/}
                        {/*  }*/}
                        {/*})}*/}
                        {/*{mapTokens.map((token, index) => {*/}
                        {/*  if (token.layer === "GM") {*/}
                        {/*    return <DraggableIcon key={token.key} x={token.x} y={token.y}*/}
                        {/*                          token={token}*/}
                        {/*                          scale={scale.current}/>*/}
                        {/*  }*/}
                        {/*})}*/}
                        {/*  </Layer>*/}
                        {/*</Stage>*/}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );

};

export default BattleMap;
