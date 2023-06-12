import React, {useState} from 'react';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import DraggableIcon from "@/components/draggableicon";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../styles/Battlemap.module.css";
import GridOverlay from "@/components/gridoverlay";
import ZoomSlider from "@/components/zoomslider";
const GRID_SIZE = 25



const BattleMap = () => {
  // Define your component logic here
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [backgroundImage, setBackgroundImage] = useState('/forest_battlemap.jpg')
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomChange = (event) => {
    const newZoomLevel = parseFloat(event.target.value);
    setZoomLevel(newZoomLevel);
  };

  const handleWheel = (event) => {
    const scaleFactor = 0.01; // Adjust the scale factor to control the zoom speed
    const delta = event.deltaY > 0 ? -1 : 1; // Determine scroll direction
    const newZoomLevel = zoomLevel + delta * scaleFactor;
    setZoomLevel(newZoomLevel);
  };

  const handleDrop = (item, monitor) => {
    const offset = monitor.getDifferenceFromInitialOffset();
    const { x, y } = iconPosition;

    if (offset) {
      const { x: offsetX, y: offsetY } = offset;

      // Adjust the offset based on the zoom level
      const scaledOffsetX = offsetX / zoomLevel;
      const scaledOffsetY = offsetY / zoomLevel;

      const newPosition = {
        x: x + scaledOffsetX,
        y: y + scaledOffsetY,
      };

      setIconPosition(newPosition);
    }
  };

  const handleIconPosition = (position) => {
    setIconPosition(position)
  }

  return (
    <div className={styles.battlemap} onWheel={handleWheel} id={"battlemap"}>
      <div className={styles.mapContainer} style={{ transform: `scale(${zoomLevel})` }}>
        <DraggableIcon iconPosition={iconPosition} setIconPosition={handleIconPosition} zoomLevel={zoomLevel} />

        <div className={styles.mapImageContainer}>
          <img src="/forest_battlemap.jpg" alt="Battle Map" className={styles.mapImage} />
        </div>
        <GridOverlay gridSize={GRID_SIZE} />
        <ZoomSlider value={zoomLevel} onChange={handleZoomChange} />
      </div>
    </div>
  );
};



export default BattleMap;
