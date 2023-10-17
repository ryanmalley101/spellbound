import React, {useEffect, useState} from 'react';
import {Circle} from 'react-konva';

const Ping = ({x, y, scale}) => {
    const [ringSize, setRingSize] = useState(0);
    const [pingVisible, setPingVisible] = useState(true);

    useEffect(() => {
        const animation = new window.Konva.Animation(frame => {
            if (ringSize >= 100) {
                setPingVisible(false);
                animation.stop();
            } else {
                setRingSize(ringSize + 3); // Adjust the increment value to control the animation speed
            }
        });

        animation.start();

        return () => {
            animation.stop();
        };
    }, [ringSize]);

    return (
        <>
            <Circle
                x={x}
                y={y}
                radius={ringSize / 2}
                fill='transparent'
                stroke='#00f'
                strokeWidth={5}
                opacity={pingVisible ? 1 : 0}
                shadowColor='#00f'
                shadowBlur={5}
                shadowOpacity={1}
                shadowOffsetX={0}
                shadowOffsetY={0}
            />
        </>
    );
};


export default Ping;