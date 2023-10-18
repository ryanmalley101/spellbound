import React, {useEffect, useState} from 'react';
import {Stage, Layer, Rect} from 'react-konva';
import {FOW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "@/graphql/mutations";


const hideAllFOW = () => {

}

const FogOfWarCanvas = ({stageWidth, stageHeight, fowShapes}) => {


    if (fowShapes && stageWidth && stageHeight) {
        return (
            <>
                {fowShapes.map((shape, index) => {
                    if (shape.type === TOOL_ENUM.REVEAL) {
                        return <Rect
                            key={index}
                            x={shape.x}
                            y={shape.y}
                            width={shape.width}
                            height={shape.height}
                            globalCompositeOperation={shape.layer === FOW_ENUM.HIDE ? null : 'destination-out'}
                            fill="black"
                        />
                    }
                })}
            </>
        );
    }
};

export default FogOfWarCanvas;
