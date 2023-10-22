import styles from "@/styles/ToolBar.module.css";
import {FaBars} from "@react-icons/all-files/fa/FaBars";
import {FaEye} from "@react-icons/all-files/fa/FaEye";
import {ListItemButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import useBattlemapStore, {DRAW_ENUM, FOW_ENUM, TOOL_ENUM} from "@/stores/battlemapStore";
import {RiSwordLine} from "@react-icons/all-files/ri/RiSwordLine";
import {FaHandPaper} from "@react-icons/all-files/fa/FaHandPaper";
import {FaMousePointer} from "@react-icons/all-files/fa/FaMousePointer";
import {FaPaintBrush} from "@react-icons/all-files/fa/FaPaintBrush";
import {FaRuler} from "@react-icons/all-files/fa/FaRuler";
import {BiCheckbox} from "@react-icons/all-files/bi/BiCheckbox";
import {BiCircle} from "@react-icons/all-files/bi/BiCircle";
import {BiPencil} from "@react-icons/all-files/bi/BiPencil";
import {BiShapePolygon} from "@react-icons/all-files/bi/BiShapePolygon";
import {BiText} from "@react-icons/all-files/bi/BiText";
import {BiUpArrow} from "@react-icons/all-files/bi/BiUpArrow";
import {revealAllFOW} from "@/components/gameComponents/mapElements/fogofwar";
import {API, graphqlOperation} from "aws-amplify";
import {v4 as uuidv4} from "uuid";
import * as mutations from "@/graphql/mutations";
import * as PropTypes from "prop-types";
import MapLayersTool from "@/components/gameComponents/tools/maplayerstool";
import FOWTool from "@/components/gameComponents/tools/fowtool";

const ToolBar = ({mapTokensRef, mapDimensionsRef}) => {
    const {selectedTool, setSelectedTool} = useBattlemapStore()
    const {mapLayer, setMapLayer} = useBattlemapStore()
    const {drawTool, setDrawTool} = useBattlemapStore()
    const {activeMap} = useBattlemapStore()
    const {playerIsDM} = useBattlemapStore()
    const [isMapButtonsVisible, setIsMapButtonsVisible] = useState(false); // State variable for additional buttons
    const [isDrawButtonsVisible, setIsDrawButtonsVisible] = useState(false); // State variable for additional buttons
    const [isFogOfWarButtonsVisible, setIsFogOfWarButtonsVisible] = useState(false); // State variable for additional buttons

    const handleMapButtonClick = () => {
        setSelectedTool(TOOL_ENUM.LAYERS)
        setIsMapButtonsVisible((prevState) => !prevState); // Toggle the state when the button is clicked
        setIsDrawButtonsVisible(false)
        setIsFogOfWarButtonsVisible(false)
    };

    const handleDrawButtonClick = () => {
        setSelectedTool(TOOL_ENUM.DRAW)
        setIsDrawButtonsVisible(true)
        setIsMapButtonsVisible(false)
        setIsFogOfWarButtonsVisible(false)
    }

    const handleFogOfWarButtonClick = () => {
        setSelectedTool(TOOL_ENUM.REVEAL)
        setIsFogOfWarButtonsVisible(true)
        setIsDrawButtonsVisible(false)
        setIsMapButtonsVisible(false)
    }

    useEffect(() => {
        if (selectedTool !== TOOL_ENUM.DRAW) {
            setIsDrawButtonsVisible(false)
        }
        if (selectedTool !== TOOL_ENUM.LAYERS) {
            setIsMapButtonsVisible(false)
        }
        if (selectedTool !== TOOL_ENUM.REVEAL) {
            setIsFogOfWarButtonsVisible(false)
        }
    }, [selectedTool]);

    const bulkDeleteFOW = async () => {
        const batchMutation = mapTokensRef.current.filter((shape) => shape.type === TOOL_ENUM.REVEAL).map((shape, i) => {
            console.log(shape)
            return (
                `mutation${i}: deleteToken(input: {id: "${shape.id}"}) { 
                    id 
                    createdAt 
                    updatedAt 
                    mapTokensId
                    map {
                        sizeX
                        sizeY
                        name
                        game {
                          id
                          name
                          dms
                          activeMap
                          gameMode
                          activeSong
                          songPlaying
                          createdAt
                          updatedAt
                          userGamesId
                          gameSongQueueId
                        }
                        id
                        createdAt
                        updatedAt
                        gameMapsId
                        __typename
                    }
                  }`
            )
            console.log(shape)
        });
        console.log(batchMutation)
        if (batchMutation.length > 0) {
            try {
                const batchResponse = await API.graphql(
                    graphqlOperation(`
              mutation batchMutation {
                ${batchMutation}
              }
            `)
                );
                console.log("deleted fow elements", batchResponse);
                // setSelectedTokenID(""); // Clear the selectedTokenID here if needed
            } catch (error) {
                console.error("Error fow elements:", error);
            }
        }
    }

    const revealAllFOW = async () => {
        bulkDeleteFOW()
    }

    const hideAllFOW = async () => {
        await bulkDeleteFOW()

        const newId = uuidv4()

        const fowMask = {
            id: newId,
            key: newId,
            x: 0,
            y: 0,
            width: mapDimensionsRef.current.width,
            height: mapDimensionsRef.current.height,
            type: TOOL_ENUM.REVEAL,
            layer: FOW_ENUM.HIDE,
            mapTokensId: activeMap
        }

        console.log(fowMask)
        const newToken = await API.graphql({
            query: mutations.createToken,
            variables: {input: fowMask}
        });

        console.log("Applied mask over entire canvas")
        console.log(newToken)
        return newToken.data.createToken.id
    }

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

            {playerIsDM ? <MapLayersTool selectedTool={selectedTool} mapButtonsVisible={isMapButtonsVisible}/> : null}


            {/* Conditionally render additional buttons */}

            {playerIsDM ? <FOWTool revealAllFOW={revealAllFOW} hideAllFOW={hideAllFOW}
                                   isFogOfWarButtonsVisible={isFogOfWarButtonsVisible}
                                   handleFogOfWarButtonClick={handleFogOfWarButtonClick}
                                   selectedTool={selectedTool}/> : null}


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
                    backgroundColor: selectedTool === TOOL_ENUM.OTHER ? '#ccc' : 'transparent',
                }}
                className={styles.ToolContainer}
                edge="end"
                onClick={() => setSelectedTool(TOOL_ENUM.OTHER)}
            >
                <RiSwordLine className={styles.ToolIcon}/>
            </ListItemButton>
        </div>
    );
};

export default ToolBar;
