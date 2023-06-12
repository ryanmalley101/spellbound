import React, {useEffect, useRef, useState} from 'react';
import {useDrag} from 'react-dnd';
import styles from '../styles/Battlemap.module.css'
import 'react-resizable/css/styles.css';
import {Rnd} from "react-rnd";

const CustomHandle = ({ position }) => (
  <div
    style={{
      position: 'absolute',
      width: '20px',
      height: '20px',
      background: '#fff',
      border: 'solid',
      borderWidth: '1',
      borderColor: 'black',
      borderRadius: '50%',
      zIndex: 20, // Adjust the z-index value as needed
      ...position,
    }}
  />
);

const DraggableIcon = ( { iconPosition, setIconPosition, zoomLevel }) => {

  const handleIconPosition = (position) => {
    setIconPosition(position);
  };

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const dragStartRef = useRef(null); // Define the dragStartRef using useRef
  const previousIconPositionRef = useRef(iconPosition);

  const handleResize = (e, direction, ref, delta, position) => {
    const { width, height } = ref.style;
    setWidth(parseInt(width));
    setHeight(parseInt(height));
  };

  const handleMouseDown = (e) => {
    event.preventDefault()
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    console.log(iconPosition)

  };

  const handleMouseUp = (e) => {
    const { x, y } = e;
    const dragStart = dragStartRef.current;
    const previousIconPosition = previousIconPositionRef.current;

    if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {
      const deltaX = (x - dragStart.x) / zoomLevel;
      const deltaY = (y - dragStart.y) / zoomLevel;
      const newPositionX = previousIconPosition.x + deltaX;
      const newPositionY = previousIconPosition.y + deltaY;
      setIconPosition({ x: newPositionX, y: newPositionY });
      previousIconPositionRef.current = { x: newPositionX, y: newPositionY };
    }

    dragStartRef.current = null;
    console.log(iconPosition)
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp); // Attach the mouseup event listener to the window object
    return () => {
      window.removeEventListener('mouseup', handleMouseUp); // Clean up the event listener on component unmount
    };
  }, []); // Empty dependency array to run the effect only once


  // Define the appearance and behavior of the draggable icon
  return (
    <Rnd
      size={{ width: width, height: height }}  // Set the initial size of the draggable and resizable component
      position={{ x: iconPosition.x, y: iconPosition.y }} // Set the initial position of the component
      onMouseDown={handleMouseDown}
      style={{zIndex: 10}}
      // Add the onResizeStop event handler to update the icon's position after resizing
      onResizeStop={(e, direction, ref, delta, position) =>
        handleIconPosition({ x: position.x, y: position.y })
      }
      onResize={handleResize}
      resizeHandleStyles={{
        bottomRight: {
          background: '#fff',
          border: '1px solid #ddd',
          right: '0',
          bottom: '0',
          width: '10px',
          height: '10px',
        },
      }}
      bounds="parent"
      enableResizing={{
        bottomRight: true,
      }}
      resizeHandleWrapperClass="resize-handle-wrapper"
    >
      <div className={styles.iconOverlay}>
        <div className={styles.draggableicon}>
            <img src="/rogue.png" alt="Icon" width={width} height={height} />
        </div>
      </div>
    </Rnd>
  );

}

export default DraggableIcon