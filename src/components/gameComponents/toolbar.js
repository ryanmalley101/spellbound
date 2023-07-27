import styles from "@/styles/ToolBar.module.css";
import {FaMousePointer, FaHandPaper, FaPaintBrush, FaEye, FaRuler} from "react-icons/fa";
import {RxText} from "react-icons/rx";
import {GiAxeSword} from "react-icons/gi";
import {ListItem, ListItemButton} from "@mui/material";
import React from "react";
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";

const ToolBar = () => {
  const {selectedTool, setSelectedTool} = useBattlemapStore();

  return (
    <div className={styles.ToolBar}>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.SELECT ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.SELECT)}
      >
        <FaMousePointer className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.DRAG ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.DRAG)}
      >
        <FaHandPaper className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.DRAW ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.DRAW)}
      >
        <FaPaintBrush className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.REVEAL ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.REVEAL)}
      >
        <FaEye className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.RULER ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.RULER)}
      >
        <FaRuler className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.TEXT ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.TEXT)}
      >
        <RxText className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton
        sx={{
          flexGrow: 0,
          display: 'block',
          minWidth: 'auto',
          backgroundColor: selectedTool === TOOL_ENUM.OTHER ? '#ccc' : 'transparent',
        }}
        className={styles.ToolContainer}
        edge="end"
        onClick={() => setSelectedTool(TOOL_ENUM.OTHER)}
      >
        <GiAxeSword className={styles.ToolIcon}/>
      </ListItemButton>
    </div>
  );
};

export default ToolBar;
