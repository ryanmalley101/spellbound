import React, {useEffect, useState} from 'react';
import {Line, Text} from 'react-konva';

const Ruler = ({shape}) => {
    const getLineLength = () => {
        return Math.round(Math.sqrt((shape.points[2] - shape.points[0]) ** 2 + (shape.points[3] - shape.points[1]) ** 2)).toString()
    }

    if (shape) {
        return (
            <>
                <Line
                    points={shape.points}
                    stroke="black"
                />
                <Text
                    x={shape.points[2]}
                    y={shape.points[3] - 10}
                    text={getLineLength()}
                    fontSize={28}
                />
            </>
        );
    }
};


export default Ruler;