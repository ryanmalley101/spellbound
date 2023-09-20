import Konva from "konva";
import {Stage, Layer, Line, Rect, Circle, RegularPolygon} from 'react-konva';

import {useEffect, useRef, useState} from "react";
import styles from '../../styles/Battlemap.module.css'
import useBattlemapStore, {DRAW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";

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


    const [labels, setLabels] = useState([])
    const lastLabelRef = useRef();

    const [polygon, setPolygon] = useState([])
    const lastPolygonRef = useRef();


    const [isDrawing, setIsDrawing] = useState(false)
    const [drawTimer, setDrawTimer] = useState(0)

    const [initialPoint, setInitialPoint] = useState({x: 0, y: 0})

    const getPoint = (e) => {
        return {
            x: (e.clientX - 75 - windowPositionRef.current.x) / scale.current,
            y: (e.clientY - windowPositionRef.current.y) / scale.current
        }
    }

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
            const point = getPoint(e)
            const newCircles = [...circles, {x: point.x, y: point.y, radius: 0}]
            lastCircleRef.current = newCircles.length - 1
            setInitialPoint(point)
            setCircles(newCircles)
        }

        if (drawTool === DRAW_ENUM.TRIANGLE) {
            const point = getPoint(e)
            const newTriangles = [...triangles, [point.x, point.y]]
            lastTriangleRef.current = newTriangles.length - 1
            setInitialPoint(point)
            setTriangles(newTriangles)
        }

        setDrawTimer(new Date().getTime())
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
    };

    const handleMouseUp = () => {
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
                </Layer>
            </Stage>
        </div>

    )
}

export default DrawingCanvas