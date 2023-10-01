import useBattlemapStore, {DRAW_ENUM} from "@/stores/battlemapStore";
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
                     handleShapeSelect,
                     selectionRef
                 }) => {

    const {activeMap} = useBattlemapStore()

    const onMove = (e) => {
        console.log(e)
    }

    const handleResizeStop = async (e, direction, ref, delta, position) => {

        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = selectionRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);

        const resizedTokenDetails = {
            id: shape.id,
            key: shape.key,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
        };

        console.log("Updating token", resizedTokenDetails)
        const updatedToken = await API.graphql({
            query: mutations.updateToken,
            variables: {input: resizedTokenDetails}
        });
        console.log(updatedToken)
    };

    const handleDragStop = async (e) => {
        console.log('Handling drag stop', e)
        // onChange({
        //     ...shape,
        //     x: e.target.x(),
        //     y: e.target.y(),
        // });

        const draggedTokenDetails = {
            id: shape.id,
            key: shape.key,
            // mapTokensId: activeMap,
            x: e.target.x(),
            y: e.target.y(),
            width: e.target.width(),
            height: e.target.height()
        };
        console.log(shape)
        console.log(draggedTokenDetails)

        const updatedToken = await API.graphql({
            query: mutations.updateToken,
            variables: {input: draggedTokenDetails}
        });

        console.log(updatedToken)
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

    if (!shape) {
        return <></>
    }

    if (shape.type === DRAW_ENUM.PEN) {
        return <>
            <Line
                id={shape.id}
                points={shape.points}
                stroke="black"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                draggable
                onTransformEnd={handleResizeStop}
                onDragEnd={(e) => onLineDragEnd(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
                className="shape"
            />
        </>
    }
    if (shape.type === "RECTANGLE") {
        return <>
            <Rect
                id={shape.id}
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onTransformEnd={handleResizeStop}
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.CIRCLE) {
        return <>
            <Circle
                id={shape.id}
                key={index}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onTransformEnd={handleResizeStop}
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.TRIANGLE) {
        return <>
            <Line
                id={shape.id}
                key={index}
                closed={true}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onTransformEnd={handleResizeStop}
                onDragEnd={(e) => handleDragStop(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.POLYGON) {
        return <>
            <Line
                id={shape.id}
                closed={true}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable
                onTransformEnd={handleResizeStop}
                onDragEnd={(e) => onLineDragEnd(e, index)}
                onClick={(e) => handleShapeSelect(e, shape)}
                className="shape"
            />
        </>
    }
    if (shape.type === DRAW_ENUM.LABEL) {
        return <>
            <Text
                id={shape.id}
                x={shape.x}
                y={shape.y}
                text={shape.text}
                fontSize={shape.fontSize}
                draggable={!editing}
                onTransformEnd={handleResizeStop}
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
        return <DraggableIcon token={shape}
                              handleDragStop={handleDragStop}
                              onDragMove={onMove}
                              onDragEnd={(e) => handleDragStop(e, index)}
                              onClick={(e) => handleShapeSelect(e, shape)}/>
    }

}

export default Drawing