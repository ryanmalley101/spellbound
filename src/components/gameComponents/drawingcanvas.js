import Konva from "konva";
import {Stage, Layer, Line, Rect, Circle, RegularPolygon, Transformer, Text} from 'react-konva';

import {Fragment, useEffect, useRef, useState} from "react";
import styles from '../../styles/Battlemap.module.css'
import useBattlemapStore, {DRAW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {v4 as uuidv4} from 'uuid';

const Drawing = ({shape}) => {

}

const DrawingCanvas = ({windowPositionRef, scale}) => {

    const {
        zoomLevel, selectedTool, drawTool
    } = useBattlemapStore();

    const [lines, setLines] = useState([])
    const lastLineRef = useRef();

    const [rectangles, setRectangles] = useState([])
    const lastRectangleRef = useRef();

    const [circles, setCircles] = useState([])
    const lastCircleRef = useRef();

    const [triangles, setTriangles] = useState([])
    const lastTriangleRef = useRef();
    const [selectedLabelId, setSelectedLabelId] = useState("");
    const [editing, setEditing] = useState(false);
    const textInputRef = useRef();

    const [labels, setLabels] = useState([])
    const lastLabelRef = useRef();

    const [polygons, setPolygons] = useState([])
    const lastPolygonRef = useRef(-1)
    const currentPolyPoint = useRef()

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawTimer, setDrawTimer] = useState(0)

    const [initialPoint, setInitialPoint] = useState({x: 0, y: 0})

    const clickTimeout = useRef(null);

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
        const updatedTextObjects = labels.map((textObj) => {
            if (textObj.id === selectedLabelId) {
                return {...textObj, text: e.target.value};
            }
            return textObj;
        });
        setLabels(updatedTextObjects);
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
        console.log(e)
        setIsDrawing(true);
        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.PEN) {
            const newLines = [...lines, []]
            lastLineRef.current = newLines.length - 1
            newLines[lastLineRef.current].push(point);
            setLines([...newLines]);
        }
        if (drawTool === DRAW_ENUM.RECTANGLE) {
            const newRects = [...rectangles, {x: point.x, y: point.y, width: 0, height: 0}]
            lastRectangleRef.current = newRects.length - 1
            setInitialPoint(point)
            setRectangles(newRects)
        }
        if (drawTool === DRAW_ENUM.CIRCLE) {
            const newCircles = [...circles, {x: point.x, y: point.y, radius: 0}]
            lastCircleRef.current = newCircles.length - 1
            setInitialPoint(point)
            setCircles(newCircles)
        }

        if (drawTool === DRAW_ENUM.TRIANGLE) {
            const newTriangles = [...triangles, [point.x, point.y]]
            lastTriangleRef.current = newTriangles.length - 1
            setInitialPoint(point)
            setTriangles(newTriangles)
        }

        if (drawTool === DRAW_ENUM.LABEL) {
            if (!editing) {
                // Check if it's a double-click (within a certain time frame)
                if (clickTimeout.current) {
                    console.log(labels)
                    clearTimeout(clickTimeout.current)
                    clickTimeout.current = null
                    handleTextDblClick(e, e.target.id)
                } else {
                    clickTimeout.current = setTimeout(() => {
                        clickTimeout.current = null
                        console.log("Creating new label")
                        const newLabelId = uuidv4()
                        const newLabels = [...labels, {
                            text: "THISISTESTTEXT",
                            x: point.x,
                            y: point.y,
                            fontSize: 32,
                            id: newLabelId
                        }]
                        lastLabelRef.current = newLabels.length - 1
                        setTimeout(() => {
                            // Stops the click event itself from removing focus from the newly editable label
                            setEditing(true)
                        }, 100);
                        setSelectedLabelId(newLabelId)
                        setLabels(newLabels)
                    }, 500)
                }
            }
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || new Date().getTime() - drawTimer < 50) return
        // setDrawTimer(new Date().getTime())
        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.PEN) {
            lines[lastLineRef.current].push(point);
            setLines([...lines]);
        }
        if (drawTool === DRAW_ENUM.RECTANGLE) {
            const rect = {
                x: Math.min(point.x, initialPoint.x),
                y: Math.min(point.y, initialPoint.y),
                width: Math.abs(point.x - initialPoint.x),
                height: Math.abs(point.y - initialPoint.y)
            }
            const oldRects = [...rectangles]
            oldRects[lastRectangleRef.current] = rect
            setRectangles(oldRects)
        }
        if (drawTool === DRAW_ENUM.CIRCLE) {
            const deltaX = Math.abs(point.x - initialPoint.x)
            const deltaY = Math.abs(point.y - initialPoint.y)
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

            const circle = {x: initialPoint.x, y: initialPoint.y, radius: distance}
            const oldCircles = [...circles]
            oldCircles[lastCircleRef.current] = circle
            setCircles(oldCircles)
        }
        if (drawTool === DRAW_ENUM.TRIANGLE) {
            const deltaX = Math.abs(point.x - initialPoint.x)
            const deltaY = Math.abs(point.y - initialPoint.y)
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

            const triangle = [initialPoint.x, initialPoint.y, topX, topY, bottomX, bottomY]
            const oldTriangles = [...triangles]
            oldTriangles[lastTriangleRef.current] = triangle
            setTriangles(oldTriangles)
        }

        if (drawTool === DRAW_ENUM.POLYGON) {
            const currentPolygons = [...polygons]
            currentPolygons[lastPolygonRef.current][currentPolyPoint.current] = point.x
            currentPolygons[lastPolygonRef.current][currentPolyPoint.current + 1] = point.y
            setPolygons(currentPolygons)
        }
    };

    const handleMouseUp = (e) => {
        const point = getPoint(e)

        if (drawTool === DRAW_ENUM.POLYGON) {
            console.log(polygons)
            if (lastPolygonRef.current === -1) {
                setIsDrawing(true);
                const newPolygons = [...polygons, [point.x, point.y, point.x, point.y]]
                lastPolygonRef.current = newPolygons.length - 1
                currentPolyPoint.current = 2
                setInitialPoint(point)
                setPolygons(newPolygons)
                return
            }

            const currentPolygon = polygons[lastPolygonRef.current]
            const deltaX = Math.abs(currentPolygon[currentPolyPoint.current - 2] - point.x)
            const deltaY = Math.abs(currentPolygon[currentPolyPoint.current - 1] - point.y)
            if (deltaX < 2 && deltaY < 2) {
                setIsDrawing(false);
                lastPolygonRef.current = -1
                return
            } else {
                const oldPolygons = [...polygons]
                oldPolygons[lastPolygonRef.current].push(point.x, point.y)
                setPolygons(oldPolygons)
                currentPolyPoint.current = currentPolyPoint.current + 2
                return
            }
        }

        setIsDrawing(false);
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
                pointerEvents: selectedTool === TOOL_ENUM.DRAW ? 'auto' : "none"
            }}
            ref={divRef}
        >
            <Stage
                className={styles.canvas}
                width={dimensions.width} height={dimensions.height}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.flatMap((point) => [point.x, point.y])}
                            stroke="black"
                            strokeWidth={2}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                        />
                    ))}
                    {rectangles.map((rect, i) => (
                        <Rect
                            key={i}
                            x={rect.x}
                            y={rect.y}
                            width={rect.width}
                            height={rect.height}
                            stroke={'black'}
                            strokeWidth={4}
                        />
                    ))}
                    {circles.map((circle, i) => (
                        <Circle
                            key={i}
                            x={circle.x}
                            y={circle.y}
                            radius={circle.radius}
                            stroke={'black'}
                            strokeWidth={4}
                        />
                    ))}
                    {triangles.map((triangle, i) => (
                        <Line
                            key={i}
                            closed={true}
                            points={triangle}
                            stroke={'black'}
                            strokeWidth={4}
                        />
                    ))}
                    {polygons.map((polygon, i) => (
                        <Line
                            key={`${i}+${polygon.length}+${polygon[polygon.length - 2]}+${polygon[polygon.length - 1]}`}
                            closed={true}
                            points={polygon}
                            stroke={'black'}
                            strokeWidth={4}
                        />
                    ))}
                    {labels.map((text, index) => (
                        <Fragment key={text.id}>
                            <Text
                                x={text.x}
                                y={text.y}
                                text={text.text}
                                fontSize={text.fontSize}
                                draggable={!editing}
                                onDblClick={(e) => handleTextDblClick(e, text.id)}
                                onClick={(e) => {
                                    // Prevent selecting the stage when clicking on text
                                    e.cancelBubble = true;
                                }}
                            />
                            {selectedLabelId === text.id && (
                                <Transformer
                                    // ref={textInputRef}
                                    attachTo={text}
                                    visible={true}
                                    onClick={(e) => {
                                        // Prevent selecting the stage when clicking on text
                                        e.cancelBubble = true;
                                    }}
                                    rotationEnabled={false}
                                />
                            )}
                        </Fragment>
                    ))}
                </Layer>
            </Stage>
            {editing && (
                <input
                    type="text"
                    ref={textInputRef}
                    value={labels.find((obj) => obj.id === selectedLabelId)?.text || ""}
                    onChange={handleTextChange}
                    autoFocus
                    onBlur={(e) => setEditing(false)}
                    onKeyPress={handleTextKeyPress}
                    style={{
                        position: "absolute",
                        top: `${labels.find((obj) => obj.id === selectedLabelId)?.y || "10"}px`,
                        left: `${labels.find((obj) => obj.id === selectedLabelId)?.x || "10"}px`,
                        zIndex: 999,
                        fontSize: `${labels.find((obj) => obj.id === selectedLabelId)?.fontSize || "16"}px`
                    }}
                />
            )}
        </div>

    )
}

export default DrawingCanvas