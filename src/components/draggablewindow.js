import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/DraggableWindow.module.css'
import 'react-resizable/css/styles.css';
import {Rnd} from "react-rnd";
import CharacterSheet from "@/components/charactersheet";
import {BsX} from "react-icons/bs";
import useBattlemapStore from "@/stores/battlemapStore";

const DraggableWindow = ({initialPosition, content}) => {
  const [windowPosition, setWindowPosition] = useState({x: 0, y: 0});
  const [width, setWidth] = useState(820);
  const [height, setHeight] = useState(800);
  const dragStartRef = useRef(null); // Define the dragStartRef using useRef
  const toggleVisibility = useBattlemapStore(state => state.toggleSheetVisibility)

  const handleResize = (e, direction, ref) => {
    const {width, height} = ref.style;
    setWidth(parseInt(width));
    setHeight(parseInt(height));
  };

  const handleDragStart = () => {
    dragStartRef.current = {x: windowPosition.x, y: windowPosition.y};
    console.log('Handling drag start')
  };

  const handleDragStop = (e, d) => {
    console.log('Handling drag stop')
    const {x, y} = d;
    const dragStart = dragStartRef.current;

    if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {
      const adjustedX = (x).toFixed(1);
      const adjustedY = (y).toFixed(1);
      setWindowPosition({x: parseFloat(adjustedX), y: parseFloat(adjustedY)});
    }

    dragStartRef.current = null;
  };

  const onClose = () => {
    toggleVisibility(content.id)
    console.log('close')
  }

  useEffect(() => {
    if (initialPosition) {
      setWindowPosition({x: initialPosition.x, y: initialPosition.y})
    }
  }, []); // Empty dependency array to run the effect only once

  if (content.isOpen) {
    return (
      <Rnd
        size={{width: width, height: height}}
        position={{x: windowPosition.x, y: windowPosition.y}} // Set the initial position of the component
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        style={{
          zIndex: 20,
          backgroundColor: 'white'
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setWindowPosition({
            x: parseFloat((position.x).toFixed(1)),
            y: parseFloat((position.y).toFixed(1)),
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
        dragHandleClassName={styles.header}
      >
        <div className={styles.windowContainer}>
          <div className={styles.header}>
            <button className={styles.closeButton} onClick={onClose}>
              <BsX className={styles.closeIcon}/>
            </button>
          </div>
          <div className={styles.subContainer}>
            <CharacterSheet name={content.name} id={content.id}/>
          </div>
        </div>
      </Rnd>
    );
  } else {
    return null
  }

}

export default DraggableWindow