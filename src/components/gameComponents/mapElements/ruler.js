import React, {useEffect, useState} from 'react';
import {Line, Text} from 'react-konva';

const Ruler = ({shape, GRID_SIZE}) => {
    const getLineLength = () => {
        const distanceX = Math.round(Math.abs(shape.points[2] - shape.points[0]) / GRID_SIZE)
        const distanceY = Math.round(Math.abs(shape.points[3] - shape.points[1]) / GRID_SIZE)
        const max = Math.max(distanceX, distanceY)
        const min = Math.min(distanceX, distanceY)

        const totalSquares = max + (min - min % 2) / 2;
        return (totalSquares * 5).toString() + " Ft."
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
                    y={shape.points[3] - 20}
                    text={getLineLength()}
                    fontSize={28}
                />
            </>
        );
    }
};


export default Ruler;