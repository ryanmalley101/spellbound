import Konva from "konva";
import {Stage, Layer, Line} from 'react-konva';

import {useEffect, useRef, useState} from "react";
import styles from '../../styles/Battlemap.module.css'
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";

const DrawingCanvas = ({windowPositionRef, scale}) => {

    const {
        zoomLevel, selectedTool
    } = useBattlemapStore();

    const [lines, setLines] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)
    const [drawTimer, setDrawTimer] = useState(0)
    const lastLineRef = useRef();

    const handleMouseDown = (e) => {
        console.log(e)
        setIsDrawing(true);
        const newLines = [...lines, []]
        // setLines([...lines, []]);
        lastLineRef.current = newLines.length - 1

        console.log(lines)

        const point = {
            x: (e.clientX - 75 - windowPositionRef.current.x) / scale.current,
            y: (e.clientY - windowPositionRef.current.y) / scale.current,
        };

        setDrawTimer(new Date().getTime())
        newLines[lastLineRef.current].push(point);
        setLines([...newLines]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return

        if (new Date().getTime() - drawTimer > 50) {
            console.log(lines)

            const point = {
                x: (e.clientX - 75 - windowPositionRef.current.x) / scale.current,
                y: (e.clientY - windowPositionRef.current.y) / scale.current,
            };

            setDrawTimer(new Date().getTime())
            lines[lastLineRef.current].push(point);
            setLines([...lines]);
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
                </Layer>
            </Stage>
        </div>

    )
}

export default DrawingCanvas