import React, {useRef, useState} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import styles from './Battlemap.module.css'

const DraggableIcon = ( { iconPosition }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'icon',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Define the appearance and behavior of the draggable icon
  return (
    <div
      className={styles.iconOverlay}
      style={{
        transform: `translate(${iconPosition.x}px, ${iconPosition.y}px)`,
        opacity: isDragging ? 0.5 : 1 ,
        display: 'flex'
      }}
    >
      <div
        ref={drag} // Attach the drag ref to the draggable element
        className={styles.draggableicon}
        // style={{ opacity: isDragging ? 0.5 : 1 }} // Adjust the appearance when dragging
      >
        <img src="/rogue.png" alt="Icon" width={100} height={100}/>
      </div>
    </div>
  );

}

export default DraggableIcon