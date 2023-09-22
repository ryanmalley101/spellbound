import Konva from "konva";
import {Stage, Layer, Line, Rect, Circle, RegularPolygon, Transformer, Text} from 'react-konva';

import {Fragment, useEffect, useRef, useState} from "react";
import styles from '../../styles/Battlemap.module.css'
import useBattlemapStore, {DRAW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {v4 as uuidv4} from 'uuid';

const Drawing = ({shape, index, onShapeDragEnd, onLineDragEnd, editing, handleTextDblClick, selectedLabelId}) => {
    if (shape.type === DRAW_ENUM.PEN) {
        return <>
            <Line
                points={shape.points}
                stroke="black"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                draggable
                onDragEnd={(e) => onLineDragEnd(e, index)}
                className="shape"
            />
        </>
    }
    if (shape.type === "RECTANGLE") {
        return <>
            <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onDragEnd={(e) => onShapeDragEnd(e, index)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.CIRCLE) {
        return <>
            <Circle
                key={index}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onDragEnd={(e) => onShapeDragEnd(e, index)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.TRIANGLE) {
        return <>
            <Line
                key={index}
                closed={true}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onDragEnd={(e) => onShapeDragEnd(e, index)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.POLYGON) {
        return <>
            <Line
                closed={true}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onDragEnd={(e) => onLineDragEnd(e, index)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.LABEL) {
        return <>
            <Text
                x={shape.x}
                y={shape.y}
                text={shape.text}
                fontSize={shape.fontSize}
                draggable={!editing}
                onDblClick={(e) => handleTextDblClick(e, shape.id)}
                onClick={(e) => {
                    // Prevent selecting the stage when clicking on text
                    e.cancelBubble = true;
                }}
                onDragEnd={(e) => onShapeDragEnd(e, index)}
                className="shape"
            />
            {selectedLabelId === shape.id && (
                <Transformer
                    // ref={textInputRef}
                    attachTo={shape}
                    visible={true}
                    onClick={(e) => {
                        // Prevent selecting the stage when clicking on text
                        e.cancelBubble = true;
                    }}
                    rotationEnabled={false}
                />
            )}
        </>
    }
}

const DrawingCanvas = ({windowPositionRef, scale}) => {

    const {
        zoomLevel, selectedTool, drawTool
    } = useBattlemapStore();

    const [selectionRect, setSelectionRect] = useState(null);
    const [selectedShapes, setSelectedShapes] = useState([]);
    const stageRef = useRef();

    const [shapes, setShapes] = useState([])
    const lastShapeRef = useRef(0)

    const [selectedLabelId, setSelectedLabelId] = useState("");
    const [editing, setEditing] = useState(false);
    const textInputRef = useRef();

    const currentPolyPoint = useRef()

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawTimer, setDrawTimer] = useState(0)

    const [initialPoint, setInitialPoint] = useState({x: 0, y: 0})

    const clickTimeout = useRef(null);

    // const handleShapeClick = (e, shape) => {
    //     setSelectedShapes([]);
    // };

    const handleStageClick = (e) => {
        // Clear selection when clicking on the stage
        setSelectedShapes([]);
    };

    const getPoint = (e) => {
        return {
            x: (e.clientX - 75 - windowPositionRef.current.x) / scale.current,
            y: (e.clientY - windowPositionRef.current.y) / scale.current
        }
    }

    const handleTextDblClick = (e, id) => {
        console.log(`Handling double click for`)
        console.log(e)
        setEditing(true);
        setSelectedLabelId(id);
        // Focus the input field and select the text
        // textInputRef.current.focus();
    }

    const handleTextChange = (e) => {
        const updatedTextObjects = shapes.map((shape) => {
            if (shape.id === selectedLabelId) {
                return {...shape, text: e.target.value};
            }
            return shape;
        });
        setShapes(updatedTextObjects);
    };

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
        };
        textInputRef.current.focus()
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [editing])

    const handleMouseDown = (e) => {
        if (selectedTool === TOOL_ENUM.DRAW) {
            if (drawTool === DRAW_ENUM.POLYGON) {
                return
            }

            setIsDrawing(true);
            const point = getPoint(e)

            if (drawTool === DRAW_ENUM.PEN) {
                const newShapes = [...shapes, {type: DRAW_ENUM.PEN, points: [point.x, point.y]}]
                lastShapeRef.current = newShapes.length - 1
                console.log(newShapes)
                setShapes(newShapes);
            }
            if (drawTool === DRAW_ENUM.RECTANGLE) {
                const newShapes = [...shapes, {type: DRAW_ENUM.RECTANGLE, x: point.x, y: point.y, width: 0, height: 0}]
                lastShapeRef.current = newShapes.length - 1
                setInitialPoint(point)
                setShapes(newShapes);
            }
            if (drawTool === DRAW_ENUM.CIRCLE) {
                const newShapes = [...shapes, {type: DRAW_ENUM.CIRCLE, x: point.x, y: point.y, radius: 0}]
                lastShapeRef.current = newShapes.length - 1
                setInitialPoint(point)
                setShapes(newShapes);
            }

            if (drawTool === DRAW_ENUM.TRIANGLE) {
                const newShapes = [...shapes, {type: DRAW_ENUM.TRIANGLE, points: [point.x, point.y]}]
                lastShapeRef.current = newShapes.length - 1
                setInitialPoint(point)
                setShapes(newShapes);
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
                            const newShapes = [...shapes, {
                                type: DRAW_ENUM.LABEL,
                                text: "NEW LABEL",
                                x: point.x,
                                y: point.y,
                                fontSize: 32,
                                id: newLabelId
                            }]
                            lastShapeRef.current = newShapes.length - 1
                            setTimeout(() => {
                                // Stops the click event itself from removing focus from the newly editable label
                                setEditing(true)
                            }, 100);
                            setSelectedLabelId(newLabelId)
                            setShapes(newShapes);
                        }, 500)
                    }
                }
            }
        } else if (selectedTool === TOOL_ENUM.SELECT) {
            const {x, y} = getPoint(e)
            setSelectionRect({
                x1: x,
                y1: y,
                x2: x,
                y2: y,
            });
        }
    };

    const handleMouseMove = (e) => {

        if (selectedTool === TOOL_ENUM.SELECT) {
            if (selectionRect) {
                const {x, y} = getPoint(e)
                setSelectionRect({
                    ...selectionRect,
                    x2: x,
                    y2: y,
                });
            }
            return
        }

        if (!isDrawing || new Date().getTime() - drawTimer < 50) return

        // setDrawTimer(new Date().getTime())
        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.PEN) {
            const updatedLine = [...shapes]
            updatedLine[lastShapeRef.current].points = updatedLine[lastShapeRef.current].points.concat([point.x, point.y]);
            setShapes(updatedLine)
        }
        if (drawTool === DRAW_ENUM.RECTANGLE) {
            const rect = {
                type: DRAW_ENUM.RECTANGLE,
                x: Math.min(point.x, initialPoint.x),
                y: Math.min(point.y, initialPoint.y),
                width: Math.abs(point.x - initialPoint.x),
                height: Math.abs(point.y - initialPoint.y)
            }
            const oldShapes = [...shapes]
            oldShapes[lastShapeRef.current] = rect
            setShapes(oldShapes)
        }
        if (drawTool === DRAW_ENUM.CIRCLE) {
            const deltaX = Math.abs(point.x - initialPoint.x)
            const deltaY = Math.abs(point.y - initialPoint.y)
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

            const circle = {type: DRAW_ENUM.CIRCLE, x: initialPoint.x, y: initialPoint.y, radius: distance}
            const oldShapes = [...shapes]
            oldShapes[lastShapeRef.current] = circle
            setShapes(oldShapes)
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
            const oldShapes = [...shapes]
            oldShapes[lastShapeRef.current].points = trianglePoints
            setShapes(oldShapes)
        }

        if (drawTool === DRAW_ENUM.POLYGON) {
            const oldShapes = [...shapes]
            const oldPolygon = oldShapes[lastShapeRef.current]
            oldPolygon.points[currentPolyPoint.current] = point.x
            oldPolygon.points[currentPolyPoint.current + 1] = point.y
            oldShapes[lastShapeRef.current] = oldPolygon
            setShapes(oldShapes)
        }
    };

    const handleMouseUp = (e) => {
        if (selectedTool === TOOL_ENUM.SELECT) {
            if (selectionRect) {
                const shapes = stageRef.current.find(".shape"); // Adjust the class name as needed
                console.log(shapes)
                const newlySelectedShapes = shapes.filter((shape) =>
                    isInsideSelection(shape.getClientRect(), selectionRect)
                );
                console.log("Selected Shapes:", newlySelectedShapes);


                setSelectedShapes(newlySelectedShapes);
                setSelectionRect(null);
            }
            return
        }

        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.POLYGON) {
            if (!isDrawing) {
                setIsDrawing(true);
                const oldShapes = [...shapes, {type: DRAW_ENUM.POLYGON, points: [point.x, point.y, point.x, point.y]}]
                lastShapeRef.current = oldShapes.length - 1
                currentPolyPoint.current = 2
                setInitialPoint(point)
                setShapes(oldShapes)
                return
            }

            lastShapeRef.current = shapes.length - 1
            console.log(shapes)
            const currentPolygon = shapes[lastShapeRef.current]
            const deltaX = Math.abs(currentPolygon.points[currentPolyPoint.current - 2] - point.x)
            const deltaY = Math.abs(currentPolygon.points[currentPolyPoint.current - 1] - point.y)
            console.log(deltaX, deltaY)
            if (deltaX < 2 && deltaY < 2) {
                setIsDrawing(false);
                lastShapeRef.current = -1
                return
            } else {
                const oldShapes = [...shapes]
                oldShapes[lastShapeRef.current].points = oldShapes[lastShapeRef.current].points.concat([point.x, point.y])
                setShapes(oldShapes)
                currentPolyPoint.current = currentPolyPoint.current + 2
                return
            }
        }
        setIsDrawing(false);
    };

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

    const onShapeDragEnd = (e, index) => {
        console.log(e, index)
        setShapes(prevState => {
            return prevState.map((r, i) => {
                if (i === index) {
                    r.x = e.target.x()
                    r.y = e.target.y()
                }
                return r
            })
        })
    }

    const onLineDragEnd = (e, index) => {
        console.log(e, index)
        setShapes(prevState => {
            return prevState.map((r, i) => {
                if (i === index) {
                    r.points = r.points.map((point, index) => {
                        if (index % 2 === 0) {
                            return point + e.target.x()
                        }
                        return point + e.target.y()
                    })
                }
                return r
            })
        })
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                zIndex: 100,
                position: "absolute",
                width: "inherit",
                height: "inherit",
                pointerEvents: selectedTool === TOOL_ENUM.DRAW || selectedTool === TOOL_ENUM.SELECT ? 'auto' : "none"
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
                    {shapes.map((shape, index) => {
                        return <Fragment key={JSON.stringify(shape)}>
                            <Drawing
                                shape={shape}
                                index={index}
                                editing={editing}
                                handleTextDblClick={handleTextDblClick}
                                selectedLabelId={selectedLabelId}
                                onShapeDragEnd={onShapeDragEnd}
                                onLineDragEnd={onLineDragEnd}
                            />
                        </Fragment>
                    })}

                    {selectedShapes.map((shape, index) => (
                        <Transformer
                            key={index}
                            ref={(node) => {
                                if (node) {
                                    // Attach the transformer to the shape
                                    node.attachTo(shape);
                                }
                            }}
                            keepRatio={false} // Adjust as needed
                        />
                    ))}
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
            {editing && (
                <input
                    type="text"
                    ref={textInputRef}
                    value={shapes.find((obj) => obj.id === selectedLabelId)?.text || ""}
                    onChange={handleTextChange}
                    autoFocus
                    onBlur={(e) => setEditing(false)}
                    onKeyPress={handleTextKeyPress}
                    style={{
                        position: "absolute",
                        top: `${shapes.find((obj) => obj.id === selectedLabelId)?.y || "10"}px`,
                        left: `${shapes.find((obj) => obj.id === selectedLabelId)?.x || "10"}px`,
                        zIndex: 999,
                        fontSize: `${shapes.find((obj) => obj.id === selectedLabelId)?.fontSize || "16"}px`
                    }}
                />
            )}
        </div>

    )
}

export default DrawingCanvas