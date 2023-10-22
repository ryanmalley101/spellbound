import {ListItemButton} from "@mui/material";
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import styles from "@/styles/ToolBar.module.css";
import {FaBars} from "@react-icons/all-files/fa/FaBars";
import * as PropTypes from "prop-types";
import React from "react";

function MapLayersTool(props) {
    const {mapLayer, setMapLayer} = useBattlemapStore()


    return <>
        <ListItemButton
            sx={{
                flexGrow: 0,
                display: "block",
                minWidth: "auto",
                backgroundColor: props.selectedTool === TOOL_ENUM.LAYERS ? "#ccc" : "transparent",
            }}
            className={styles.ToolContainer}
            edge="end"
            onClick={props.onClick} // Use the click handler for the FaBarsStaggered button
        >
            <FaBars className={styles.ToolIcon}/>
        </ListItemButton>

        {/* Conditionally render additional buttons */}
        {props.mapButtonsVisible && (
            <>
                {/* Additional buttons */}
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        backgroundColor: mapLayer === "GM" ? "#ccc" : "transparent",
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={() => setMapLayer("GM")} // Set the selected tool when the "GM" button is clicked
                >
                    GM
                </ListItemButton>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        backgroundColor: mapLayer === "TOKEN" ? "#ccc" : "transparent",
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={() => setMapLayer("TOKEN")} // Set the selected tool when the "Token" button is clicked
                >
                    Token
                </ListItemButton>
                <ListItemButton
                    sx={{
                        flexGrow: 0,
                        display: "block",
                        minWidth: "auto",
                        backgroundColor: mapLayer === "MAP" ? "#ccc" : "transparent",
                    }}
                    className={styles.ToolContainer}
                    edge="end"
                    onClick={() => setMapLayer("MAP")} // Set the selected tool when the "Map" button is clicked
                >
                    Map
                </ListItemButton>
            </>
        )}
    </>;
}

MapLayersTool.propTypes = {
    selectedTool: PropTypes.string,
    mapButtonsVisible: PropTypes.bool,
};

export default MapLayersTool