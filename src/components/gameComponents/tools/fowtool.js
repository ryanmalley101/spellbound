import {ListItemButton} from "@mui/material";
import useBattlemapStore, {FOW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import styles from "@/styles/ToolBar.module.css";
import * as PropTypes from "prop-types";
import React from "react";
import {FaEye} from "@react-icons/all-files/fa/FaEye";

function FOWTool(props) {
    const {fogOfWarMode, setFogOfWarMode} = useBattlemapStore()

    return <>
        <ListItemButton
            sx={{
                flexGrow: 0,
                display: 'block',
                minWidth: 'auto',
                backgroundColor: props.selectedTool === TOOL_ENUM.REVEAL ? '#ccc' : 'transparent',
            }}
            className={styles.ToolContainer}
            edge="end"
            onClick={props.handleFogOfWarButtonClick}
        >
            <FaEye className={styles.ToolIcon}/>
        </ListItemButton>
        {props.isFogOfWarButtonsVisible &&
            <>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        backgroundColor: fogOfWarMode === FOW_ENUM.REVEAL ? "#ccc" : "transparent",
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={() => setFogOfWarMode(FOW_ENUM.REVEAL)}
                >
                    Reveal
                </ListItemButton>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        backgroundColor: fogOfWarMode === FOW_ENUM.HIDE ? "#ccc" : "transparent",
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={() => setFogOfWarMode(FOW_ENUM.HIDE)}
                >
                    Hide
                </ListItemButton>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        // backgroundColor: fogOfWarMode === FOW_ENUM.HIDE ? '#ccc' : 'transparent',
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={props.revealAllFOW}
                >
                    Reveal All
                </ListItemButton>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        // backgroundColor: fogOfWarMode === FOW_ENUM.HIDE ? '#ccc' : 'transparent',
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={props.hideAllFOW}
                >
                    Hide All
                </ListItemButton>
            </>
        }
    </>;
}

export default FOWTool