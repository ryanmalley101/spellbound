import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from '../../styles/Battlemap.module.css'
import 'react-resizable/css/styles.css';
import {Rnd} from "react-rnd";
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import {API, Storage} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import {Button} from "@mui/material";
import Image from 'next/image'

const DraggableIcon = ({token, scale, x, y}) => {
  const zoomLevel = useBattlemapStore(state => state.zoomLevel)
  const [iconPosition, setIconPosition] = useState({x: x, y: y});
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [imgsrc, setImgsrc] = useState(null);
  const dragStartRef = useRef(null); // Define the dragStartRef using useRef
  const selectedTool = useBattlemapStore((state) => state.selectedTool);
  const selectedTokenID = useBattlemapStore((state) => state.selectedTokenID);
  const setSelectedTokenID = useBattlemapStore((state) => state.setSelectedTokenID);
  const mapLayer = useBattlemapStore((state) => state.mapLayer);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});

  const handleResize = async (e, direction, ref, delta, position) => {
    const {width, height} = ref.style;
    setWidth(parseInt(width));
    setHeight(parseInt(height));
  };

  const handleResizeStop = async (e, direction, ref, delta, position) => {
    console.log("handling resize stop")
    console.log(e, direction, ref, delta, position)
    const {width, height} = ref.style;

    setIconPosition({
      x: parseFloat((position.x / zoomLevel).toFixed(1)),
      y: parseFloat((position.y / zoomLevel).toFixed(1)),
    });

    setWidth(parseInt(width));
    setHeight(parseInt(height));
    const resizedTokenDetails = {
      id: token.id,
      key: token.key,
      width: parseInt(width),
      height: parseInt(height),
      positionX: position.x,
      positionY: position.y
    };

    const updatedToken = await API.graphql({
      query: mutations.updateToken,
      variables: {input: resizedTokenDetails}
    });
  };

  const handleDragStart = () => {
    dragStartRef.current = {x: iconPosition.x / zoomLevel, y: iconPosition.y / zoomLevel};
    console.log('Handling drag start')
  };

  useEffect(() => {
    setIconPosition({x: token.positionX, y: token.positionY})
    setWidth(token.width)
    setHeight(token.height)
  }, [token])

  const handleDragStop = async (e, d) => {
    console.log('Handling drag stop')
    const {x, y} = d;
    const dragStart = dragStartRef.current;

    if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {

      const adjustedX = parseFloat((x).toFixed(1))
      const adjustedY = parseFloat((y).toFixed(1))
      setIconPosition({x: adjustedX, y: adjustedY});
      const draggedTokenDetails = {
        id: token.id,
        positionX: adjustedX,
        positionY: adjustedY
      };

      const updatedToken = await API.graphql({
        query: mutations.updateToken,
        variables: {input: draggedTokenDetails}
      });
    }

    dragStartRef.current = null;
  };

  useLayoutEffect(() => {
    const fetchImagePath = async (imageURL) => {
      try {
        Storage.configure({level: 'public'});
        const signedUrl = await Storage.get(`${imageURL.substring(1)}`, {
          validateObjectExistence: true
        });
        console.log('Got image from S3', signedUrl)
        setImgsrc(signedUrl);
      } catch (e) {
        console.log(e);
        setImgsrc(imageURL);
      }
    };


    if (token.positionX && token.positionY) setIconPosition({x: token.positionX, y: token.positionY})
    if (token.imageURL) {
      fetchImagePath(token.imageURL)
    } else console.error("No URL was provided for token")
    if (token.width && token.height) {
      setWidth(token.width)
      setHeight(token.height)
    }
    // if (token)
  }, []); // Empty dependency array to run the effect only once

  // Click handler to select the token
  const handleIconClick = () => {
    console.log("Checking select tool")
    if (selectedTool === TOOL_ENUM.SELECT) {
      console.log(`Selecting token ${token.id}`)
      setSelectedTokenID(token.id);
      console.log(selectedTokenID)
    }
  };


  const handleContextMenu = (event) => {
    console.log("Icon Context")
    event.preventDefault(); // Prevent the default right-click context menu behavior
    // Calculate the position of the context menu based on the click event coordinates
    const contextMenuX = iconPosition.x;
    const contextMenuY = iconPosition.y;

    // Set the context menu position using the calculated coordinates
    setContextMenuPosition({x: contextMenuX, y: contextMenuY});
    setShowContextMenu(true);
  };

  const handleMenuClick = async (option) => {
    // Handle the click of the menu options here based on the selected option
    console.log('Clicked option:', option);
    // Perform actions based on the selected option (e.g., "GM", "Token", or "Map")
    // You can close the context menu here or do other actions as needed.
    const updatedToken = {...token, layer: option}
    console.log(updatedToken)
    try {
      const layeredToken = await API.graphql({
        query: mutations.updateToken,
        variables: {input: updatedToken}
      });
    } catch (e) {
      console.log("error adding layer to token")
      console.log(e)
    }

    setShowContextMenu(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const menuContainer = document.getElementById('custom-context-menu');
      if (menuContainer && !menuContainer.contains(event.target)) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showContextMenu]);

  let tokenZIndex = 10
  if (token.layer === 'MAP') {
    tokenZIndex = 10
  } else if (token.layer === 'TOKEN') {
    tokenZIndex = 11
  } else {
    tokenZIndex = 12
  }

  if (imgsrc) {
    // Define the appearance and behavior of the draggable icon
    return (
      <Rnd
        size={{width: width, height: height}}
        scale={scale}// Set the initial size of the draggable and resizable component
        position={{x: iconPosition.x, y: iconPosition.y}} // Set the initial position of the component
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        disableDragging={selectedTool !== TOOL_ENUM.SELECT || token.layer !== mapLayer}
        style={{
          zIndex: tokenZIndex, boxShadow: selectedTokenID === token.id ? '0 0 0 2px blue' : 'none',
          width: width, height: height
          // transform: `scale(${zoomLevel})`, // Scale the Rnd container
        }}
        onResizeStop={handleResizeStop}
        onResize={handleResize}
        bounds="parent"
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        resizeHandleStyles={{
          top: {cursor: 'n-resize'},
          right: {cursor: 'e-resize'},
          bottom: {cursor: 's-resize'},
          left: {cursor: 'w-resize'},
          topRight: {cursor: 'ne-resize'},
          bottomRight: {cursor: 'se-resize'},
          bottomLeft: {cursor: 'sw-resize'},
          topLeft: {cursor: 'nw-resize'},
        }}
        resizeHandleWrapperClass="resize-handle-wrapper"
        onClick={handleIconClick} // Attach the click handler to the icon
        onContextMenu={handleContextMenu}
      >
        <div>
          {/* Your component content */}

          {/* Custom Context Menu */}
          {showContextMenu && (
            <div
              id="custom-context-menu"
              style={{
                position: 'fixed',
                transform: `translate(25px, 25px)`,
                backgroundColor: 'transparent', // Make the background transparent
                boxShadow: 'none', // Remove the box shadow
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column', // Stack the icons vertically
              }}
            >
              {/* MUI Buttons */}
              <Button onClick={() => handleMenuClick('GM')} variant="contained" color="primary">
                GM
              </Button>
              <Button onClick={() => handleMenuClick('TOKEN')} variant="contained" color="primary">
                Token
              </Button>
              <Button onClick={() => handleMenuClick('MAP')} variant="contained" color="primary">
                Map
              </Button>
            </div>
          )}
        </div>
        {/*<div className={styles.iconOverlay} onContextMenu={handleContextMenu}>*/}
        <div className={styles.draggableicon}>
          <Image src={imgsrc} priority={true} alt="Icon" width={width} height={height} style={{pointerEvents: 'none'}}/>
        </div>
        {/*</div>*/}
      </Rnd>
    );
  }
}

export default DraggableIcon