import React, {useEffect, useRef, useState} from 'react';

const Ping = ({x, y, scale}) => {
  const [ringSize, setRingSize] = useState(100);
  const [pingVisible, setPingVisible] = useState(true);
  const animationRef = useRef();

  // console.log("Creating ping")

  useEffect(() => {
    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(updateRingSize);
    };

    const updateRingSize = () => {
      setRingSize((prevSize) => {
        if (prevSize <= 0) {
          setPingVisible(false);
          return 100;
        }
        return prevSize - 5; // Adjust the decrement value to control the animation speed
      });
      animationRef.current = requestAnimationFrame(updateRingSize);
    };

    startAnimation();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - ringSize / 2,
        top: y - ringSize / 2,
        width: ringSize,
        height: ringSize,
        borderRadius: '50%',
        border: '2px solid #00f',
        boxShadow: '0 0 5px #00f',
        opacity: pingVisible ? 1 : 0,
        zIndex: 10000
      }}
    ></div>
  );
};

export default Ping;