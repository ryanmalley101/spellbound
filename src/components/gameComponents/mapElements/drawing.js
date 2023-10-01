import {DRAW_ENUM} from "@/stores/battlemapStore";
import {Circle, Line, Rect, Text, Transformer} from "react-konva";
import React from "react";
import {API} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import DraggableIcon from "@/components/gameComponents/mapElements/draggableicon";


const Drawing = ({
                     shape,
                     index,
                     editing,
                     handleTextDblClick,
                     selectedLabelId,
                     handleShapeSelect
                 }) => {

    const handleDragStop = async (e) => {
        console.log('Handling drag stop')

        onChange({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
        });

        const draggedTokenDetails = {
            id: shape.id,
            key: shape.key,
            x: e.target.x(),
            y: e.target.y()
        };

        const updatedToken = await API.graphql({
            query: mutations.updateToken,
            variables: {input: draggedTokenDetails}
        });

        console.log(updatedToken)
    }

    // const onLineDragEnd = (e, index) => {
    //     console.log(e, index)
    //     setShapes(prevState => {
    //         return prevState.map((r, i) => {
    //             if (i === index) {
    //                 r.points = r.points.map((point, index) => {
    //                     if (index % 2 === 0) {
    //                         return point + e.target.x()
    //                     }
    //                     return point + e.target.y()
    //                 })
    //             }
    //             return r
    //         })
    //     })
    // }

    if (!shape) {
        return <></>
    }

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
                onClick={(e) => handleShapeSelect(e, shape)}
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
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
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
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
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
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
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
                onClick={(e) => handleShapeSelect(e, shape)}
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
                onDragEnd={(e) => handleDragStop(e, index)}
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

    if (shape.type === DRAW_ENUM.IMAGE) {
        return <DraggableIcon token={shape} handleDragStop={handleDragStop}/>
    }

}

export default Drawing