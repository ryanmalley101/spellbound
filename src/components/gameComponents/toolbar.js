import styles from "@/styles/ToolBar.module.css"
import {FaMousePointer, FaHandPaper, FaPaintBrush, FaEye, FaRuler} from "react-icons/fa";
import {RxText} from "react-icons/rx";
import {GiAxeSword} from "react-icons/gi";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Image from "next/image";
import {BsFillFilePlusFill} from "react-icons/bs";
import React from "react";

const ToolBar = ({directory, parentPath = '', filter}) => {

  return (
    <div className={styles.ToolBar}>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <FaMousePointer className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <FaHandPaper className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <FaPaintBrush className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <FaEye className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <FaRuler className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <RxText className={styles.ToolIcon}/>
      </ListItemButton>
      <ListItemButton sx={{flexGrow: 0, display: 'block', minWidth: 'auto'}} className={styles.ToolContainer}
                      edge="end">
        <GiAxeSword className={styles.ToolIcon}/>
      </ListItemButton>
    </div>
  )

}

export default ToolBar