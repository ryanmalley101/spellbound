import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/Battlemap.module.css';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import {
    onCreateRuler,
    onCreateToken,
    onDeleteRuler,
    onDeleteToken,
    onUpdateGame,
    onUpdateRuler
} from '@/graphql/subscriptions';
import * as mutations from '@/graphql/mutations';
import {TransformComponent, TransformWrapper, useControls} from 'react-zoom-pan-pinch';
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import {useDropzone} from 'react-dropzone'
import DrawingCanvas from "@/components/gameComponents/mapElements/drawingcanvas";

const GRID_SIZE = 70

const BattleMap = ({mapTokensRef, mapDimensionsRef}) => {

    const [draggingDisabled, setDraggingDisabled] = useState(true);
    const [selectingDisabled, setSelectingDisabled] = useState(false)
    const [widthUnits, setWidthUnits] = useState(25);
    const [heightUnits, setHeightUnits] = useState(25);
    const [mapTokens, setMapTokens] = useState(['debug'])
    const [mapRulers, setMapRulers] = useState([])
    const [isDraggingFile, setIsDraggingFile] = useState(false)

    const windowPositionRef = useRef({x: 0, y: 0})
    const scale = useRef(1)

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
        zoomLevel,
        setZoomLevel,
        selectedTool,
        selectedTokenID,
        setSelectedTokenID,
        mapLayer,
        setMapLayer,
        gameID,
        activeMap,
        setActiveMap,
        playingSong,
        setPlayingSong,
        setIsSongPlaying,
        setSongQueue
    } = useBattlemapStore();

    const addMapToken = (newToken) => {
        console.log("adding map token")
        setMapTokens((oldMapTokens) => {
            console.log(oldMapTokens)
            return [...oldMapTokens, newToken]
        })
    }

    const updateMapToken = (updatedToken) => {
        console.log("Updating map tokens");
        // console.log(mapTokens);
        console.log(updatedToken)
        console.log(mapTokens)
        setMapTokens((oldTokens) => {
            return oldTokens.map((token) => {
                if (token.id === updatedToken.id && token !== updatedToken) {
                    console.log(token, updatedToken)
                    return {...updatedToken}
                }
                return token
            })
        })
        // // You can access the updated mapTokens directly here:
        // console.log("Updated Map Tokens", mapTokens);
    };

    const removeMapToken = (deletedToken) => {
        console.log("removing map token")
        setMapTokens(oldMapTokens => oldMapTokens.filter((token) => {
            console.log(token, deletedToken)
            if (token.id !== deletedToken.id) {
                return token
            }
        }))
    }

    const addMapRuler = (newRuler) => {
        console.log("adding map ruler")
        setMapRulers((oldMapRulers) => {
            console.log(oldMapRulers)
            return [...oldMapRulers, newRuler]
        })
    }

    const updateMapRuler = (updatedRuler) => {
        console.log("Updating map rulers");
        // console.log(mapTokens);
        console.log(updatedRuler)
        console.log(mapRulers)
        setMapRulers((oldRulers) => {
            return oldRulers.map((ruler) => {
                if (ruler.id === updatedRuler.id && ruler !== updatedRuler) {
                    console.log(ruler, updatedRuler)
                    return {...updatedRuler}
                }
                return ruler
            })
        })
        // // You can access the updated mapTokens directly here:
        // console.log("Updated Map Tokens", mapTokens);
    };

    const removeMapRuler = (deletedRuler) => {
        console.log("removing map ruler", deletedRuler, mapRulers)
        setMapRulers(oldMapRulers => oldMapRulers.filter((ruler) => {
            console.log(ruler, deletedRuler)
            if (ruler.id !== deletedRuler.id) {
                return ruler
            }
        }))
    }

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
                            type
                            imageURL
                            points
                            radius
                            layer
                            text
                            fontSize
                            width
                            height
                            rotation
                            x
                            y
                            key
                          }
                        }
                        rulers {
                            items {
                                points
                                playerRulersId
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
                                                        type
                                                        imageURL
                                                        points
                                                        radius
                                                        layer
                                                        text
                                                        fontSize
                                                        width
                                                        height
                                                        rotation
                                                        x
                                                        y
                                                        key
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
            console.log("Delete Token Subscription", data)
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

    const subscribeToRulerCreation = () => {
        const subscriptionHandler = (data) => {
            const newRuler = data.value.data.onCreateRuler;
            addMapRuler(newRuler);
        };

        const subscription = API.graphql(
            graphqlOperation(onCreateRuler, {mapRulersId: activeMap}),
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

    const subscribeToRulerUpdate = () => {
        const subscriptionHandler = (data) => {
            const updatedRuler = data.value.data.onUpdateRuler;
            updateMapRuler(updatedRuler);
        };

        const subscription = API.graphql(
            graphqlOperation(onUpdateRuler, {mapRulersId: activeMap}),
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

    const subscribeToRulerDeletion = () => {
        const subscriptionHandler = (data) => {
            const deletedRuler = data.value.data.onDeleteRuler;
            console.log("Delete Ruler Subscription")
            removeMapRuler(deletedRuler);
        };

        const subscription = API.graphql(
            graphqlOperation(onDeleteRuler, {mapRulersId: activeMap}),
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
            const songQueue = data.value.data.onUpdateGame.songQueue

            setActiveMap(updatedActiveMap)
            setIsSongPlaying(isPlayingSong)
            setSongQueue(songQueue)

            if (playingSong !== updatedPlayingSong && data.value.data.onUpdateGame.activeSong && !data.value.data.onUpdateGame.paused) {
                const newSong = await Storage.get('music/' + updatedPlayingSong.url, {
                    level: 'protected',
                    identidyId: '253A4971ef34-3da5-4205-87cc-ca1cbcd4a019'
                })
                console.log(`Updated game now playing song ${newSong}`)
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


    // Whenever there is a new activeMap loaded, resubscribe to token creations and game updates
    useEffect(() => {
        // Subscribe to different events
        const unsubscribeToTokenCreation = subscribeToTokenCreation();
        const unsubscribeToTokenUpdate = subscribeToTokenUpdate();
        const unsubscribeToTokenDelete = subscribeToTokenDeletion();
        const unsubscribeToRulerCreation = subscribeToRulerCreation();
        const unsubscribeToRulerUpdate = subscribeToRulerUpdate();
        const unsubscribeToRulerDelete = subscribeToRulerDeletion();
        const unsubscribeToGameUpdate = subscribeToGameUpdate();

        // Clean up subscriptions
        return () => {
            unsubscribeToTokenCreation();
            unsubscribeToTokenUpdate();
            unsubscribeToTokenDelete();
            unsubscribeToRulerCreation();
            unsubscribeToRulerUpdate();
            unsubscribeToRulerDelete();
            unsubscribeToGameUpdate();
        };
    }, [activeMap]);

    useEffect(() => {
        console.log(selectedTool)
        setDraggingDisabled(selectedTool !== TOOL_ENUM.DRAG)
        setSelectingDisabled(selectedTool !== TOOL_ENUM.SELECT)
    }, [selectedTool])

    useEffect(() => {
        mapTokensRef.current = mapTokens
        mapDimensionsRef.current = {width: widthUnits * GRID_SIZE, height: heightUnits * GRID_SIZE}
    }, [mapTokens, widthUnits, heightUnits, GRID_SIZE])

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
             className={styles.battlemap} onContextMenu={() => {
            return false
        }}>
            <TransformWrapper style={{height: '100%', width: '100%'}} className={styles.mapContainer}
                              disabled={draggingDisabled} minScale={0.1} initialScale={scale.current}
                              onTransformed={(ref) => {
                                  windowPositionRef.current = {x: ref.state.positionX, y: ref.state.positionY}
                                  scale.current = ref.state.scale
                              }} limitToBounds={false}>
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
                        onContextMenu={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <div className={styles.fileDropZone}
                             style={{pointerEvents: isDraggingFile ? "auto" : "none"}}{...getRootProps()}>
                            <input {...getInputProps()} />
                        </div>
                        <DrawingCanvas windowPositionRef={windowPositionRef} scale={scale} mapTokens={mapTokens}
                                       mapRulers={mapRulers}
                                       widthUnits={widthUnits} heightUnits={heightUnits} GRID_SIZE={GRID_SIZE}
                                       id={"Canvas Start"}/>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );

};

export default BattleMap;
