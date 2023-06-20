import React, {useEffect, useState} from 'react';
import DraggableIcon from "@/components/draggableicon";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../styles/Battlemap.module.css";
import GridOverlay from "@/components/gridoverlay";
import ZoomSlider from "@/components/zoomslider";
import useBattlemapStore from "@/stores/battlemapStore";

const GRID_SIZE = 25


const BattleMap = () => {
  // Define your component logic here
  const zoomLevel = useBattlemapStore(state => state.zoomLevel)
  const setZoomLevel = useBattlemapStore(state => state.setZoomLevel)
  const battlemapTokens = useBattlemapStore(state => state.tokens)
  const addToken = useBattlemapStore(state => state.addToken)

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

  useEffect(() => {
    console.log(battlemapTokens)

    const initialIcon = <DraggableIcon key={"unique"} imgsrc={"/rogue.png"} initialPosition={{x: 0, y: 0}}/>
    addToken(initialIcon)

  }, [])

  return (
    <div className={styles.battlemap} onWheel={handleWheel} id={"battlemap"}>
      <div className={styles.mapContainer} style={{transform: `scale(${zoomLevel})`}}>
        {battlemapTokens.map((icon) => icon)}
        <div className={styles.mapImageContainer}>
          <img src="/forest_battlemap.jpg" alt="Battle Map" className={styles.mapImage}/>
        </div>
        <GridOverlay gridSize={GRID_SIZE}/>
      </div>
      <ZoomSlider value={zoomLevel} onChange={handleZoomChange}/>

    </div>
  );
};


export default BattleMap;
