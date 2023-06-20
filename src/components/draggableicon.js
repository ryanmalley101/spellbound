import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/Battlemap.module.css'
import 'react-resizable/css/styles.css';
import {Rnd} from "react-rnd";
import useBattlemapStore from "@/stores/battlemapStore";

const CustomHandle = ({position}) => (
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

const DraggableIcon = ({imgsrc, initialPosition}) => {
  const zoomLevel = useBattlemapStore(state => state.zoomLevel)
  const [iconPosition, setIconPosition] = useState({x: 0, y: 0});
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const dragStartRef = useRef(null); // Define the dragStartRef using useRef

  const handleIconPosition = (position) => {
    console.log('Handling icon position')
    setIconPosition(position);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    const {width, height} = ref.style;
    setWidth(parseInt(width));
    setHeight(parseInt(height));
  };

  const handleDragStart = () => {
    dragStartRef.current = {x: iconPosition.x / zoomLevel, y: iconPosition.y / zoomLevel};
    console.log('Handling drag start')
  };

  const handleDragStop = (e, d) => {
    console.log('Handling drag stop')
    const {x, y} = d;
    const dragStart = dragStartRef.current;

    if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {
      const adjustedX = (x).toFixed(1);
      const adjustedY = (y).toFixed(1);
      setIconPosition({x: parseFloat(adjustedX), y: parseFloat(adjustedY)});
    }

    dragStartRef.current = null;
  };

  useEffect(() => {
    if (initialPosition) {
      setIconPosition({x: initialPosition.x, y: initialPosition.y})
    }
  }, []); // Empty dependency array to run the effect only once


  // Define the appearance and behavior of the draggable icon
  return (
    <Rnd
      size={{width: width, height: height}}
      scale={zoomLevel}// Set the initial size of the draggable and resizable component
      position={{x: iconPosition.x, y: iconPosition.y}} // Set the initial position of the component
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      style={{zIndex: 10}}
      onResizeStop={(e, direction, ref, delta, position) => {
        setIconPosition({
          x: parseFloat((position.x / zoomLevel).toFixed(1)),
          y: parseFloat((position.y / zoomLevel).toFixed(1)),
        });
      }}
      onResize={handleResize}
      bounds="parent"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      resizeHandleStyles={{
        top: {cursor: 'n-resize'},
        right: {cursor: 'e-resize'},
        bottom: {cursor: 's-resize'},
        left: {cursor: 'w-resize'},
        topRight: {cursor: 'ne-resize'},
        bottomRight: {cursor: 'se-resize'},
        bottomLeft: {cursor: 'sw-resize'},
        topLeft: {cursor: 'nw-resize'},
      }}
      resizeHandleWrapperClass="resize-handle-wrapper"
    >
      <div className={styles.iconOverlay}>
        <div className={styles.draggableicon}>
          <img src={imgsrc} alt="Icon" width={width} height={height} style={{pointerEvents: 'none'}}/>
        </div>
      </div>
    </Rnd>
  );

}

export default DraggableIcon