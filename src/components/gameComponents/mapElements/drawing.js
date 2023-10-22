import useBattlemapStore, {DRAW_ENUM} from "@/stores/battlemapStore";
import {Circle, Line, Rect, Text, Transformer} from "react-konva";
import React, {useEffect, useRef} from "react";
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
                     selectionRef,
                     draggable
                 }) => {

    const {activeMap} = useBattlemapStore()
    const shapeRef = useRef(null)

    const onMove = (e) => {
        console.log(e)
    }

    useEffect(() => {
        if (shapeRef.current) {
            shapeRef.current.scaleX(1)
            shapeRef.current.scaleY(1)
            shapeRef.current.x(shape.x)
            shapeRef.current.y(shape.y)
        }
    }, [shape]);

    const handleResizeStop = async (e, direction, ref, delta, position) => {
        console.log("HANDLING TRANSFORM END")
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = selectionRef.current;
        console.log(e, node.scaleX(), node.scaleY())
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        // shapeRef.current.scaleX(1)
        // shapeRef.current.scaleY(1)

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
            height: Math.max(5, node.height() * scaleY)
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

    const onLineDragEnd = async (e, index) => {
        const deflat = (n, arr, y = []) => {
            return arr.length === 0
                ? y
                : deflat(n, arr.slice(n), y.concat([arr.slice(0, n)]));
        }

        const node = shapeRef.current;
        if (node) {
            console.log(node.points())
            let points = [];
            let flatendPoints = deflat(2, node.points());
            flatendPoints.forEach((k, i) => {
                let {x, y} = node
                    .getAbsoluteTransform()
                    .point({x: k[0], y: k[1]});
                points.push([x, y]);
            });

            console.log(points.flat(2));
            const updatedToken = await API.graphql({
                query: mutations.updateToken,
                variables: {input: {id: shape.id, points: points.flat(2)}}
            });
            console.log(updatedToken)
            return
        }

        console.log(e.target.getTransform(), index)
        const draggedTokenDetails = {
            id: shape.id,
            key: shape.key,
            x: e.target.x(),
            y: e.target.y(),
            // points: shape.points.map((p) => {
            //     if (index % 2 === 0) {
            //         return p + e.target.x()
            //     }
            //     return p + e.target.y()
            // })
        };
        console.log(shape)
        console.log(draggedTokenDetails)

        const updatedToken = await API.graphql({
            query: mutations.updateToken,
            variables: {input: draggedTokenDetails}
        });

        console.log(updatedToken)
    }

    if (!shape) {
        return <></>
    }

    if (shape.type === DRAW_ENUM.PEN) {
        return <>
            <Line
                id={shape.id}
                ref={shapeRef}
                points={shape.points}
                x={shape.x}
                y={shape.y}
                stroke="black"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                draggable={draggable}
                onTransformEnd={onLineDragEnd}
                onDragEnd={onLineDragEnd}
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
                ref={shapeRef}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.stroke ? shape.stroke : 'black'}
                fill={shape.fill ? shape.fill : null}
                strokeWidth={4}
                draggable={draggable}
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
                ref={shapeRef}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={'black'}
                strokeWidth={4}
                draggable={draggable}
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
                ref={shapeRef}
                closed={true}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable={draggable}
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
                ref={shapeRef}
                points={shape.points}
                stroke={'black'}
                strokeWidth={4}
                draggable={draggable}
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
                ref={shapeRef}
                x={shape.x}
                y={shape.y}
                text={shape.text}
                fontSize={shape.fontSize}
                draggable={!editing && draggable}
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
                              ref={shapeRef}
                              handleDragStop={handleDragStop}
                              onDragMove={onMove}
                              onDragEnd={(e) => handleDragStop(e, index)}
                              onClick={(e) => handleShapeSelect(e, shape)}
                              draggable={draggable}/>
    }

}

export default Drawing