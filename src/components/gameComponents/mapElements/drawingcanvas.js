import {Circle, Layer, Line, Rect, Stage, Text, Transformer} from 'react-konva';
import {Html} from 'react-konva-utils';

import React, {Fragment, useEffect, useRef, useState} from "react";
import styles from '../../../styles/Battlemap.module.css'
import useBattlemapStore, {DRAW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {v4, v4 as uuidv4} from 'uuid';
import DraggableIcon from "@/components/gameComponents/mapElements/draggableicon";
import GridOverlay from "@/components/gameComponents/mapElements/gridoverlay";
import Drawing from "@/components/gameComponents/mapElements/drawing";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {Button} from "@mui/material";
import Ping from "@/components/gameComponents/mapElements/ping";
import {onCreatePing} from "@/graphql/subscriptions";
import Ruler from "@/components/gameComponents/mapElements/ruler";

const DrawingCanvas = ({windowPositionRef, scale, mapTokens, widthUnits, heightUnits, GRID_SIZE, mapRulers}) => {

    const {
        zoomLevel, selectedTool, drawTool, activeMap, mapLayer, gameID, playerID
    } = useBattlemapStore();

    const [selectionRect, setSelectionRect] = useState(null);
    const [selectedShapes, setSelectedShapes] = useState([]);
    const stageRef = useRef();

    const [currentShape, setCurrentShape] = useState(null)
    const [rulerShape, setRulerShape] = useState(null)

    // const lastShapeRef = useRef(0)

    const [selectedLabelId, setSelectedLabelId] = useState("");
    const [editing, setEditing] = useState(false);
    const textInputRef = useRef();

    const currentPolyPoint = useRef()

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawTimer, setDrawTimer] = useState(0)

    const [initialPoint, setInitialPoint] = useState({x: 0, y: 0})

    const clickTimeout = useRef(null);

    const selectionRef = useRef(null)

    const [pings, setPings] = useState([])

    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [contextMenuShape, setContextMenuShape] = useState(null)

    const initialMousePositionRef = useRef(null)
    const mouseDownTimeRef = useRef(null);
    const mouseReleasedRef = useRef(false);
    const currentMousePositionRef = useRef({x: 0, y: 0});

    const subscribeToPingCreation = () => {
        const subscriptionHandler = (data) => {
            console.log(data, windowPositionRef.current, scale.current)
            const newPing = {...data.value.data.onCreatePing};
            // const reconstructedX = (newPing.x * scale.current) + 75 + windowPositionRef.current.x
            // const reconstructedY = (newPing.y * scale.current) + 20 + windowPositionRef.current.y
            const reconstructedX = newPing.x
            const reconstructedY = newPing.y
            console.log("Got a ping", newPing, reconstructedX, reconstructedY)

            newPing.x = reconstructedX
            newPing.y = reconstructedY
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
        const unsubscribeToPingCreation = subscribeToPingCreation();

        // Clean up subscriptions
        return () => {
            unsubscribeToPingCreation();
        };
    }, [activeMap]);

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
                        console.log("Creating a ping", event)

                        // // Perform the GraphQL mutation to create a Ping object
                        // const x = event.clientX;
                        // const y = event.clientY;

                        // const deconstructedX = (event.clientX - 75 - windowPositionRef.current.x) / scale.current
                        // const deconstructedY = (event.clientY - 20 - windowPositionRef.current.y) / scale.current
                        const pingPoint = getPoint(event)

                        const deconstructedX = pingPoint.x
                        const deconstructedY = pingPoint.y
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
        console.log("Map Container", mapContainer)
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

    const handleShapeClick = (e, shape) => {
        const stageShapes = stageRef.current.children[0].children; // Adjust the class name as needed
        console.log("Handling shape click")
        // console.log(stageShapes)
        if (stageShapes) {
            const newlySelectedShapes = stageShapes.filter((s) => {
                    // console.log(e.target._id)
                    // console.log(s._id)
                    return e.target._id === s._id
                }
            );
            console.log(newlySelectedShapes)
            setSelectedShapes(newlySelectedShapes);
        }
    }

    useEffect(() => {
        console.log(selectedShapes)
        setSelectedShapes([])
    }, [mapTokens]);

    const handleStageClick = (e) => {
        // Clear selection when clicking on the stage
        const stageShapes = stageRef.current.children[0].children; // Adjust the class name as needed
        console.log(e, stageShapes)
        if (e.target._id === 1) {
            setSelectedShapes([]);
            setShowContextMenu(false)
        } else if (e.evt.button === 2 && e.target.attrs.id) {
            // Right-click
            e.evt.preventDefault();
            console.log("Opening context menu", e)
            // Show the context menu at the right-clicked position
            setContextMenuPosition({x: e.evt.offsetX, y: e.evt.offsetY})
            setShowContextMenu(true)
            setContextMenuShape(e.target.attrs)
        } else {
            setShowContextMenu(false)
        }
    };

    const getPoint = (e) => {
        return {
            x: (e.clientX - 75 - windowPositionRef.current.x) / scale.current,
            y: (e.clientY - windowPositionRef.current.y) / scale.current
        }
    }

    useEffect(() => {
        console.log(selectedShapes)
        console.log(selectionRef.current)
        if (selectedShapes && selectionRef.current) {
            selectionRef.current.nodes(selectedShapes)
        }
    }, [selectedShapes]);

    const handleTextDblClick = (e, id) => {
        console.log(`Handling double click for`)
        console.log(e)
        setEditing(true);
        setSelectedLabelId(id);
        // Focus the input field and select the text
        // textInputRef.current.focus();
    }

    // const handleTextChange = (e) => {
    //     const updatedTextObjects = shapes.map((shape) => {
    //         if (shape.id === selectedLabelId) {
    //             return {...shape, text: e.target.value};
    //         }
    //         return shape;
    //     });
    //     setShapes(updatedTextObjects);
    // };

    const handleTextKeyPress = (e) => {
        if (e.key === "Enter") {
            setEditing(false);
            setSelectedLabelId(null);
        }
    };

    useEffect(() => {
        if (!editing) {
            return;
        }
        const handler = (e) => {
            if (e.key === "Escape") {
                setEditing(false);
                setSelectedLabelId(null);
            }
        }

        textInputRef.current.focus()
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        }
    }, [editing])

    const handleMouseDown = async (e) => {
        if (selectedTool === TOOL_ENUM.DRAW) {
            if (drawTool === DRAW_ENUM.POLYGON) {
                return
            }

            setIsDrawing(true);
            const point = getPoint(e)
            const newId = uuidv4()

            if (drawTool === DRAW_ENUM.PEN) {
                setCurrentShape({
                    type: DRAW_ENUM.PEN,
                    id: newId,
                    key: newId,
                    points: [point.x, point.y],
                    x: 0,
                    y: 0,
                    layer: mapLayer
                })
            }
            if (drawTool === DRAW_ENUM.RECTANGLE) {
                setCurrentShape({
                    type: DRAW_ENUM.RECTANGLE,
                    id: newId,
                    key: newId,
                    x: point.x,
                    y: point.y,
                    width: 0,
                    height: 0,
                    layer: mapLayer
                })
                setInitialPoint(point)
            }
            if (drawTool === DRAW_ENUM.CIRCLE) {
                setCurrentShape({
                    type: DRAW_ENUM.CIRCLE, id: newId,
                    key: newId, x: point.x, y: point.y, radius: 0, layer: mapLayer
                })
                setInitialPoint(point)
            }

            if (drawTool === DRAW_ENUM.TRIANGLE) {
                setCurrentShape({
                    type: DRAW_ENUM.TRIANGLE, id: newId,
                    key: newId, points: [point.x, point.y], layer: mapLayer
                })
                setInitialPoint(point)
            }

            if (drawTool === DRAW_ENUM.LABEL) {
                if (!editing) {
                    // Check if it's a double-click (within a certain time frame)
                    if (clickTimeout.current) {
                        clearTimeout(clickTimeout.current)
                        clickTimeout.current = null
                        handleTextDblClick(e, e.target.id)
                    } else {
                        clickTimeout.current = setTimeout(() => {
                            clickTimeout.current = null
                            console.log("Creating new label")
                            const newLabelId = uuidv4()
                            setCurrentShape({
                                type: DRAW_ENUM.LABEL,
                                text: "NEW LABEL",
                                x: point.x,
                                y: point.y,
                                fontSize: 32,
                                id: newLabelId,
                                layer: mapLayer
                            })
                            //
                            // setTimeout(() => {
                            //     // Stops the click event itself from removing focus from the newly editable label
                            //     setEditing(true)
                            // }, 100);
                            // setSelectedLabelId(newLabelId)
                            // setShapes(newShapes);
                        }, 500)
                    }
                }
            }
        } else if (selectedTool === TOOL_ENUM.SELECT) {
            if (selectedShapes.length < 1) {
                console.log(e)
                console.log(getPoint(e))
                const {x, y} = getPoint(e)
                setSelectionRect({
                    x1: x,
                    y1: y,
                    x2: x,
                    y2: y,
                });
            }
        } else if (selectedTool === TOOL_ENUM.RULER) {
            console.log("Dragging a ruler", e)
            const point = getPoint(e)
            const roundedX = Math.round((point.x + (GRID_SIZE / 2)) / GRID_SIZE) * GRID_SIZE - (GRID_SIZE / 2)
            const roundedY = Math.round((point.y + (GRID_SIZE / 2)) / GRID_SIZE) * GRID_SIZE - (GRID_SIZE / 2)
            const newId = uuidv4()

            setRulerShape({
                points: [roundedX, roundedY, roundedX, roundedY], id: newId
            })

            const input = {
                points: [roundedX, roundedY, roundedX, roundedY],
                mapRulersId: activeMap,
                playerRulersId: playerID,
                id: newId
            }
            const newRuler = await API.graphql({
                query: mutations.createRuler,
                variables: {input: input}
            });

            console.log("Creating a new token")
            console.log(newRuler)
            setCurrentShape(null)
            return newRuler.data.createRuler.id
        }
    };

    const handleMouseMove = async (e) => {
        const point = getPoint(e)

        if (selectedTool === TOOL_ENUM.SELECT) {
            if (selectionRect && selectedShapes.length < 1) {
                const {x, y} = getPoint(e)
                setSelectionRect({
                    ...selectionRect,
                    x2: x,
                    y2: y,
                });
            }
            return
        }

        if (selectedTool === TOOL_ENUM.RULER) {
            if (rulerShape) {
                if (new Date().getTime() - drawTimer < 200) return
                setDrawTimer(new Date().getTime())
                // console.log("Dragging ruler", rulerShape)
                const roundedX = Math.round((point.x + (GRID_SIZE / 2)) / GRID_SIZE) * GRID_SIZE - (GRID_SIZE / 2)
                const roundedY = Math.round((point.y + (GRID_SIZE / 2)) / GRID_SIZE) * GRID_SIZE - (GRID_SIZE / 2)
                setRulerShape((oldRuler) => {
                    return {...oldRuler, points: [oldRuler.points[0], oldRuler.points[1], roundedX, roundedY]}
                })

                const input = {
                    id: rulerShape.id,
                    points: [rulerShape.points[0], rulerShape.points[1], roundedX, roundedY],
                }

                const updatedRuler = await API.graphql({
                    query: mutations.updateRuler,
                    variables: {input: input}
                });

                console.log("Updating a ruler")
                console.log(updatedRuler)
                setCurrentShape(null)
                return updatedRuler.data.updateRuler.id
            }
            return
        }

        if (!isDrawing || new Date().getTime() - drawTimer < 50) return

        setDrawTimer(new Date().getTime())
        const newId = uuidv4()

        if (drawTool === DRAW_ENUM.PEN) {
            const oldShape = {...currentShape}
            oldShape.points = currentShape.points.concat([point.x, point.y]);
            setCurrentShape(oldShape)
        }
        if (drawTool === DRAW_ENUM.RECTANGLE) {
            const rect = {
                type: DRAW_ENUM.RECTANGLE,
                id: newId,
                key: newId,
                x: Math.min(point.x, initialPoint.x),
                y: Math.min(point.y, initialPoint.y),
                width: Math.abs(point.x - initialPoint.x),
                height: Math.abs(point.y - initialPoint.y),
                layer: mapLayer
            }
            setCurrentShape(rect)
        }
        if (drawTool === DRAW_ENUM.CIRCLE) {
            const deltaX = Math.abs(point.x - initialPoint.x)
            const deltaY = Math.abs(point.y - initialPoint.y)
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

            const circle = {
                type: DRAW_ENUM.CIRCLE,
                id: newId,
                key: newId,
                x: initialPoint.x,
                y: initialPoint.y,
                radius: distance,
                layer: mapLayer
            }
            setCurrentShape(circle)
        }
        if (drawTool === DRAW_ENUM.TRIANGLE) {
            const height = Math.sqrt(Math.pow(point.x - initialPoint.x, 2) + Math.pow(point.y - initialPoint.y, 2));

            // Calculate the length of the equilateral triangle's sides
            const sideLength = Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2, 2))

            // Calculate the coordinates of the two remaining vertices
            const angle = Math.PI / 6; // 60 degrees in radians
            const angle1 = Math.atan2(point.y - initialPoint.y, point.x - initialPoint.x) + angle;
            const angle2 = Math.atan2(point.y - initialPoint.y, point.x - initialPoint.x) - angle;

            const topX = initialPoint.x + sideLength * Math.cos(angle1);
            const topY = initialPoint.y + sideLength * Math.sin(angle1);
            const bottomX = initialPoint.x + sideLength * Math.cos(angle2);
            const bottomY = initialPoint.y + sideLength * Math.sin(angle2);

            const trianglePoints = [initialPoint.x, initialPoint.y, topX, topY, bottomX, bottomY]
            const oldShape = {...currentShape}
            oldShape.points = trianglePoints
            setCurrentShape(oldShape)
        }

        if (drawTool === DRAW_ENUM.POLYGON) {
            const oldShape = {...currentShape}
            oldShape.points[currentPolyPoint.current] = point.x
            oldShape.points[currentPolyPoint.current + 1] = point.y
            setCurrentShape(oldShape)
        }

    };

    const handleMouseUp = async (e) => {
        if (selectedTool === TOOL_ENUM.SELECT) {
            if (selectionRect && selectionRect.x1 !== selectionRect.x2 && selectionRect.y1 !== selectionRect.y2) {
                console.log(selectionRect)
                const stageShapes = stageRef.current.children[0].children; // Adjust the class name as needed
                console.log(stageShapes)
                if (stageShapes) {
                    const newlySelectedShapes = stageShapes.filter((shape) =>
                        isInsideSelection(shape.getClientRect(), selectionRect)
                    );
                    console.log("Selected Shapes:", newlySelectedShapes);
                    setSelectedShapes(newlySelectedShapes);
                    setSelectionRect(null);
                    return
                }
                // setSelectedShapes(null);
            } else {
                // handleShapeClick(e)
            }
            setSelectionRect(null)
            return
        }

        if (selectedTool === TOOL_ENUM.RULER) {
            try {
                const deletedRuler = await API.graphql({
                    query: mutations.deleteRuler,
                    variables: {input: {id: rulerShape.id}},
                });
                console.log("deleted ruler", deletedRuler);
                // setSelectedTokenID(""); // Clear the selectedTokenID here if needed
            } catch (error) {
                console.error("Error deleting ruler:", error);
            }
            setRulerShape(null)
            return
        }

        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.POLYGON) {
            if (!isDrawing) {
                setIsDrawing(true);
                setCurrentShape({
                    type: DRAW_ENUM.POLYGON,
                    id: newId,
                    key: newId,
                    points: [point.x, point.y, point.x, point.y],
                    layer: mapLayer

                })
                currentPolyPoint.current = 2
                setInitialPoint(point)
                return
            }

            const currentPolygon = {...currentShape}
            const deltaX = Math.abs(currentPolygon.points[currentPolyPoint.current - 2] - point.x)
            const deltaY = Math.abs(currentPolygon.points[currentPolyPoint.current - 1] - point.y)
            console.log(deltaX, deltaY)
            if (deltaX < 2 && deltaY < 2) {
                setIsDrawing(false);
                return createNewShape()
            } else {
                currentPolygon.points = currentPolygon.points.concat([point.x, point.y])
                setCurrentShape(currentPolygon)
                currentPolyPoint.current = currentPolyPoint.current + 2
            }
        } else {
            setIsDrawing(false);
            return createNewShape()
        }
    };

    const createNewShape = async () => {
        const input = {...currentShape, mapTokensId: activeMap,}
        console.log(currentShape)
        const newToken = await API.graphql({
            query: mutations.createToken,
            variables: {input: input}
        });

        console.log("Creating a new token")
        console.log(newToken)
        setCurrentShape(null)
        return newToken.data.createToken.id
    }

    const isInsideSelection = (rect, selection) => {
        const x1 = Math.min(selection.x1, selection.x2);
        const x2 = Math.max(selection.x1, selection.x2);
        const y1 = Math.min(selection.y1, selection.y2);
        const y2 = Math.max(selection.y1, selection.y2);


        return (
            rect.x >= x1 && rect.x + rect.width <= x2 && rect.y >= y1 && rect.y + rect.height <= y2
        );
    };

    const divRef = useRef(null)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })

    // We cant set the h & w on Stage to 100% it only takes px values so we have to
    // find the parent container's w and h and then manually set those !
    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight
            })
        }
    }, [])

    const handleMenuClick = async (option) => {
        // Handle the click of the menu options here based on the selected option
        console.log('Clicked option:', option);
        // Perform actions based on the selected option (e.g., "GM", "Token", or "Map")
        // You can close the context menu here or do other actions as needed.
        const updatedToken = {id: contextMenuShape.id, layer: option}
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

        setShowContextMenu(false);
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace' && !['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
                console.log(selectionRef.current.nodes())
                selectionRef.current.nodes().forEach((s) => deleteSelectedToken(s.attrs.id))
                // deleteSelectedToken(selectedTokenID); // Pass the selectedTokenID as an argument
            }
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
                    // setSelectedTokenID(""); // Clear the selectedTokenID here if needed
                } catch (error) {
                    console.error("Error deleting token:", error);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onContextMenu={() => {
                return false
            }}
            style={{
                zIndex: 100,
                position: "absolute",
                width: "inherit",
                height: "inherit",
                pointerEvents: selectedTool === TOOL_ENUM.DRAW || selectedTool === TOOL_ENUM.SELECT || selectedTool === TOOL_ENUM.RULER ? 'auto' : "none"
            }}
            ref={divRef}
        >
            <Stage
                className={styles.canvas}
                width={dimensions.width} height={dimensions.height}
                ref={stageRef}
                onClick={handleStageClick} // Clear selection when clicking on the stage
            >
                <Layer>
                    {<Drawing shape={currentShape}
                              editing={editing}
                              handleTextDblClick={handleTextDblClick}
                              selectedLabelId={selectedLabelId}
                              handleShapeSelect={handleShapeClick}/>}
                    {mapTokens.map((token, index) => {
                        if (token.layer === "MAP") {
                            // console.log(token.key)
                            return <Drawing
                                key={token.key}
                                shape={token}
                                index={index}
                                editing={editing}
                                handleTextDblClick={handleTextDblClick}
                                selectedLabelId={selectedLabelId}
                                selectionRef={selectionRef}
                                // onShapeDragEnd={onShapeDragEnd}
                                // onLineDragEnd={onLineDragEnd}
                                handleShapeSelect={handleShapeClick}
                            />
                        }
                    })}
                    <GridOverlay width={widthUnits * GRID_SIZE} height={heightUnits * GRID_SIZE}
                                 gridSize={GRID_SIZE}/>
                    {mapTokens.map((token, index) => {
                        if (token.layer === "TOKEN") {
                            return <Drawing
                                key={token.key}
                                shape={token}
                                index={index}
                                editing={editing}
                                handleTextDblClick={handleTextDblClick}
                                selectedLabelId={selectedLabelId}
                                selectionRef={selectionRef}
                                // onShapeDragEnd={onShapeDragEnd}
                                // onLineDragEnd={onLineDragEnd}
                                handleShapeSelect={handleShapeClick}
                            />
                        }
                    })}
                    {mapTokens.map((token, index) => {
                        if (token.layer === "GM") {
                            return <Drawing
                                key={token.key}
                                shape={token}
                                index={index}
                                editing={editing}
                                handleTextDblClick={handleTextDblClick}
                                selectedLabelId={selectedLabelId}
                                selectionRef={selectionRef}
                                // onShapeDragEnd={onShapeDragEnd}
                                // onLineDragEnd={onLineDragEnd}
                                handleShapeSelect={handleShapeClick}
                            />

                        }
                    })}
                    {pings.map((ping) => (
                        <Ping key={v4()} x={ping.x} y={ping.y}/>
                    ))}
                    {mapRulers.map((ruler) => {
                        if (!rulerShape || ruler.id !== rulerShape.id) {
                            return <Ruler key={ruler.id} shape={ruler} GRID_SIZE={GRID_SIZE}/>
                        }
                    })}
                    {rulerShape ? <Ruler shape={rulerShape} GRID_SIZE={GRID_SIZE}/> : null}
                    {showContextMenu && (
                        <Html>
                            <div
                                id="custom-context-menu"
                                style={{
                                    position: 'fixed',
                                    top: contextMenuPosition.y,
                                    left: contextMenuPosition.x,
                                    // transform: `translate(25px, 25px)`,
                                    backgroundColor: 'transparent', // Make the background transparent
                                    boxShadow: 'none', // Remove the box shadow
                                    zIndex: 9999,
                                    display: 'flex',
                                    flexDirection: 'column', // Stack the icons vertically
                                }}
                            >
                                {/* MUI Buttons */}
                                <Button onClick={() => handleMenuClick('GM')} variant="contained" color="primary">
                                    GM
                                </Button>
                                <Button onClick={() => handleMenuClick('TOKEN')} variant="contained" color="primary">
                                    Token
                                </Button>
                                <Button onClick={() => handleMenuClick('MAP')} variant="contained" color="primary">
                                    Map
                                </Button>
                            </div>
                        </Html>
                    )}

                    <Transformer
                        // nodes
                        ref={selectionRef}
                        keepRatio={false} // Adjust as needed
                    />

                    {selectionRect && (
                        <Rect
                            x={Math.min(selectionRect.x1, selectionRect.x2)}
                            y={Math.min(selectionRect.y1, selectionRect.y2)}
                            width={Math.abs(selectionRect.x2 - selectionRect.x1)}
                            height={Math.abs(selectionRect.y2 - selectionRect.y1)}
                            stroke="blue"
                            strokeWidth={1}
                            dash={[5, 5]}
                        />
                    )}
                </Layer>
            </Stage>
            {/*{editing && (*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        ref={textInputRef}*/}
            {/*        value={shapes.find((obj) => obj.id === selectedLabelId)?.text || ""}*/}
            {/*        onChange={handleTextChange}*/}
            {/*        autoFocus*/}
            {/*        onBlur={(e) => setEditing(false)}*/}
            {/*        onKeyPress={handleTextKeyPress}*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            top: `${shapes.find((obj) => obj.id === selectedLabelId)?.y || "10"}px`,*/}
            {/*            left: `${shapes.find((obj) => obj.id === selectedLabelId)?.x || "10"}px`,*/}
            {/*            zIndex: 999,*/}
            {/*            fontSize: `${shapes.find((obj) => obj.id === selectedLabelId)?.fontSize || "16"}px`*/}
            {/*        }}*/}
            {/*    />*/}
            {/*)}*/}
        </div>

    )
}

export default DrawingCanvas