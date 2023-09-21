import styles from "@/styles/ToolBar.module.css";
import {FaMousePointer, FaHandPaper, FaPaintBrush, FaEye, FaRuler, FaBars, FaDrawPolygon} from "react-icons/fa";
import {RxText} from "react-icons/rx";
import {GiAxeSword} from "react-icons/gi";
import {Box, ListItem, ListItemButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import useBattlemapStore, {DRAW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {BsPencilFill, BsTriangle} from "react-icons/bs";
import {GrCheckbox} from "react-icons/gr";
import {BiCheckbox, BiCircle, BiPencil, BiShapePolygon, BiUpArrow, BiText} from "react-icons/bi";

const ToolBar = () => {
    const {selectedTool, setSelectedTool} = useBattlemapStore()
    const {mapLayer, setMapLayer} = useBattlemapStore()
    const {drawTool, setDrawTool} = useBattlemapStore()
    const [isMapButtonsVisible, setIsMapButtonsVisible] = useState(false); // State variable for additional buttons
    const [isDrawButtonsVisible, setIsDrawButtonsVisible] = useState(false); // State variable for additional buttons

    const handleMapButtonClick = () => {
        setIsMapButtonsVisible((prevState) => !prevState); // Toggle the state when the button is clicked
        setIsDrawButtonsVisible(false)
    };

    const handleDrawButtonClick = () => {
        setSelectedTool(TOOL_ENUM.DRAW)
        setIsDrawButtonsVisible(true)
        setIsMapButtonsVisible(false)
    }

    useEffect(() => {
        if (selectedTool !== "DRAW") {
            setIsDrawButtonsVisible(false)
        }
    }, [selectedTool]);

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
                onClick={handleDrawButtonClick}
            >
                <FaPaintBrush className={styles.ToolIcon}/>
            </ListItemButton>
            {/* Conditionally render additional buttons */}
            {isDrawButtonsVisible && (
                <div style={{border: "3px solid black"}}>
                    {/* Additional buttons */}
                    <ListItemButton
                        alignItems={"center"}
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.PEN ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.PEN)} // Set the selected tool when the "GM" button is clicked
                    >
                        <BiPencil size={30}/>
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.RECTANGLE ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.RECTANGLE)} // Set the selected tool when the "Token" button is clicked
                    >
                        <BiCheckbox size={30}/>
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.CIRCLE ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.CIRCLE)} // Set the selected tool when the "Map" button is clicked
                    >
                        <BiCircle size={30}/>
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.TRIANGLE ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.TRIANGLE)} // Set the selected tool when the "Map" button is clicked
                    >
                        <BiUpArrow size={30}/>
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.POLYGON ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.POLYGON)} // Set the selected tool when the "Map" button is clicked
                    >
                        <BiShapePolygon size={30}/>
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: drawTool === DRAW_ENUM.LABEL ? '#ccc' : 'transparent',
                            width: 69
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setDrawTool(DRAW_ENUM.LABEL)} // Set the selected tool when the "Map" button is clicked
                    >
                        <BiText size={30}/>
                    </ListItemButton>
                </div>
            )}
            <ListItemButton
                sx={{
                    flexGrow: 0,
                    display: 'block',
                    minWidth: 'auto',
                    backgroundColor: selectedTool === TOOL_ENUM.REVEAL ? '#ccc' : 'transparent',
                }}
                className={styles.ToolContainer}
                edge="end"
                onClick={handleMapButtonClick} // Use the click handler for the FaBarsStaggered button
            >
                <FaBars className={styles.ToolIcon}/>
            </ListItemButton>

            {/* Conditionally render additional buttons */}
            {isMapButtonsVisible && (
                <>
                    {/* Additional buttons */}
                    <ListItemButton
                        sx={{
                            flexGrow: 0,
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: mapLayer === "GM" ? '#ccc' : 'transparent',
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
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: mapLayer === "TOKEN" ? '#ccc' : 'transparent',
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
                            display: 'block',
                            minWidth: 'auto',
                            backgroundColor: mapLayer === "MAP" ? '#ccc' : 'transparent',
                        }}
                        className={styles.ToolContainer}
                        edge="end"
                        onClick={() => setMapLayer("MAP")} // Set the selected tool when the "Map" button is clicked
                    >
                        Map
                    </ListItemButton>
                </>
            )}
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
