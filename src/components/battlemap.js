import React, {useState} from 'react';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import DraggableIcon from "@/components/draggableicon";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./Battlemap.module.css";

const BattleMap = () => {
  // Define your component logic here
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

  const handleDrop = (item, monitor) => {
    // Handle the dropped item and perform any necessary actions
    const { x, y } = monitor.getClientOffset();
    console.log('Item dropped:', item, x, y);

    setIconPosition({ x, y });
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'icon',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={styles.battlemap} id={"battlemap"} >
      <DraggableIcon iconPosition={iconPosition}/>
    </div>
  );
};

export default BattleMap;
