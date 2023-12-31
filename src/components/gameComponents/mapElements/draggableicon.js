import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from '../../../styles/Battlemap.module.css'
import 'react-resizable/css/styles.css';
import useBattlemapStore, {TOOL_ENUM} from "@/stores/battlemapStore";
import {API, Storage} from "aws-amplify";
import * as mutations from "@/graphql/mutations";
// import Image from 'next/image'
import {Image, Transformer} from "react-konva";
import useImage from 'use-image';

const DraggableIcon = ({token, handleDragStop, onDragMove, onClick, draggable}) => {
    const zoomLevel = useBattlemapStore(state => state.zoomLevel)
    const [iconPosition, setIconPosition] = useState({x: 0, y: 0});
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const [imgsrc, setImgsrc] = useState(null);
    const selectedTool = useBattlemapStore((state) => state.selectedTool);
    const shapeRef = useRef();
    const trRef = useRef();
    const [image] = useImage(imgsrc);
    const selectedTokenID = useBattlemapStore((state) => state.selectedTokenID);
    const isSelected = selectedTokenID === token.id
    // const dragStartRef = useRef(null); // Define the dragStartRef using useRef
    // const mapLayer = useBattlemapStore((state) => state.mapLayer);
    // const [showContextMenu, setShowContextMenu] = useState(false);
    // const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    //
    // const handleResize = async (e, direction, ref, delta, position) => {
    //     const {width, height} = ref.style;
    //     setWidth(parseInt(width));
    //     setHeight(parseInt(height));
    // };

    useEffect(() => {
        console.log(token)
        setIconPosition({x: token.x, y: token.y})
        setWidth(token.width)
        setHeight(token.height)
        // setImgsrc(token.imageURL)
    }, [token])

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
            }
        };


        if (token.x && token.y) setIconPosition({x: token.x, y: token.y})
        if (token.imageURL) {
            fetchImagePath(token.imageURL)
        } else console.error("No URL was provided for token")
        if (token.width && token.height) {
            setWidth(token.width)
            setHeight(token.height)
        }
        // if (token)
    }, []); // Empty dependency array to run the effect only once

    const onMove = (e) => {
        console.log(e)
        setIconPosition({x: e.target.x(), y: e.target.y()})
    }

    const handleResizeStop = async (e, direction, ref, delta, position) => {

        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);

        setIconPosition({x: node.x(), y: node.y()})
        setWidth(Math.max(5, node.width() * scaleX))
        setHeight(Math.max(node.height() * scaleY))

        const resizedTokenDetails = {
            id: token.id,
            key: token.key,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width()),
            height: Math.max(node.height()),
        };

        console.log("Updating token", resizedTokenDetails)
        const updatedToken = await API.graphql({
            query: mutations.updateToken,
            variables: {input: resizedTokenDetails}
        });
        console.log(updatedToken)
    };


    useEffect(() => {
        if (isSelected && imgsrc) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const setSelectedTokenID = useBattlemapStore((state) => state.setSelectedTokenID);

    const shapeProps = {
        x: iconPosition.x,
        y: iconPosition.y,
        width: width,
        height: height,
        id: token.id,
    }

    if (imgsrc) {
        return (
            <>
                <Image image={image}
                       priority={"true"}
                       alt="Icon"
                       style={{pointerEvents: 'none'}}
                       onClick={onClick}
                       ref={shapeRef}
                       {...shapeProps}
                       draggable={selectedTool === TOOL_ENUM.SELECT && draggable}
                       onDragEnd={handleDragStop}
                       isSelected={isSelected}
                       onTransformEnd={handleResizeStop}
                    // onDragMove={onDragMove}
                       className={styles.draggableicon}/>
                {isSelected && (<Transformer
                        ref={trRef}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                )}
            </>
        )
    }
}


export default DraggableIcon

// <URLImage
//     url={imgsrc}
//     token={token}
//     draggable={selectedTool === TOOL_ENUM.SELECT}
//     shapeProps={{
//         x: iconPosition.x,
//         y: iconPosition.y,
//         width: width,
//         height: height,
//         id: token.id,
//     }}
//     onSelect={() => {
//         console.log(`Selected token ${token.id}`)
//         setSelectedTokenID(token.id);
//     }}
//     handleDragStop={handleDragStop}
//     // onDragMove={onMove}
//     // onChange={(newAttrs) => {
//     //     console.log(newAttrs)
//     //     setIconPosition({x: newAttrs.x, y: newAttrs.y})
//     //     setWidth(newAttrs.width)
//     //     setHeight(newAttrs.height)
//     // }}
// >
// </URLImage>
//
// // Click handler to select the token
// const handleIconClick = () => {
//     console.log("Checking select tool")
//     if (selectedTool === TOOL_ENUM.SELECT) {
//         console.log(`Selecting token ${token.id}`)
//         setSelectedTokenID(token.id);
//         console.log(selectedTokenID)
//     }
// };
//
//
// const handleContextMenu = (event) => {
//     console.log("Icon Context")
//     event.preventDefault(); // Prevent the default right-click context menu behavior
//     // Calculate the position of the context menu based on the click event coordinates
//     const contextMenuX = iconPosition.x;
//     const contextMenuY = iconPosition.y;
//
//     // Set the context menu position using the calculated coordinates
//     setContextMenuPosition({x: contextMenuX, y: contextMenuY});
//     setShowContextMenu(true);
// };
//
// const handleMenuClick = async (option) => {
//     // Handle the click of the menu options here based on the selected option
//     console.log('Clicked option:', option);
//     // Perform actions based on the selected option (e.g., "GM", "Token", or "Map")
//     // You can close the context menu here or do other actions as needed.
//     const updatedToken = {...token, layer: option}
//     console.log(updatedToken)
//     try {
//         const layeredToken = await API.graphql({
//             query: mutations.updateToken,
//             variables: {input: updatedToken}
//         });
//     } catch (e) {
//         console.log("error adding layer to token")
//         console.log(e)
//     }
//
//     setShowContextMenu(false);
// };
//
// useEffect(() => {
//     const handleDocumentClick = (event) => {
//         const menuContainer = document.getElementById('custom-context-menu');
//         if (menuContainer && !menuContainer.contains(event.target)) {
//             setShowContextMenu(false);
//         }
//     };
//
//     if (showContextMenu) {
//         document.addEventListener('click', handleDocumentClick);
//     }
//
//     return () => {
//         document.removeEventListener('click', handleDocumentClick);
//     };
// }, [showContextMenu]);
//
//
//     if (imgsrc) {
//         // Define the appearance and behavior of the draggable icon
//         return (
//             <Rnd
//                 size={{width: width, height: height}}
//                 scale={scale}// Set the initial size of the draggable and resizable component
//                 position={{x: iconPosition.x, y: iconPosition.y}} // Set the initial position of the component
//                 onDragStart={handleDragStart}
//                 onDragStop={handleDragStop}
//                 disableDragging={selectedTool !== TOOL_ENUM.SELECT || token.layer !== mapLayer}
//                 style={{
//                     zIndex: tokenZIndex, boxShadow: selectedTokenID === token.id ? '0 0 0 2px blue' : 'none',
//                     width: width, height: height
//                     // transform: `scale(${zoomLevel})`, // Scale the Rnd container
//                 }}
//                 onResizeStop={handleResizeStop}
//                 onResize={handleResize}
//                 bounds="parent"
//                 enableResizing={{
//                     top: true,
//                     right: true,
//                     bottom: true,
//                     left: true,
//                     topRight: true,
//                     bottomRight: true,
//                     bottomLeft: true,
//                     topLeft: true,
//                 }}
//                 resizeHandleStyles={{
//                     top: {cursor: 'n-resize'},
//                     right: {cursor: 'e-resize'},
//                     bottom: {cursor: 's-resize'},
//                     left: {cursor: 'w-resize'},
//                     topRight: {cursor: 'ne-resize'},
//                     bottomRight: {cursor: 'se-resize'},
//                     bottomLeft: {cursor: 'sw-resize'},
//                     topLeft: {cursor: 'nw-resize'},
//                 }}
//                 resizeHandleWrapperClass="resize-handle-wrapper"
//                 onClick={handleIconClick} // Attach the click handler to the icon
//                 onContextMenu={handleContextMenu}
//             >
//                 <div>
//                     {/* Your component content */}
//
//                     {/* Custom Context Menu */}
//                     {showContextMenu && (
//                         <div
//                             id="custom-context-menu"
//                             style={{
//                                 position: 'fixed',
//                                 transform: `translate(25px, 25px)`,
//                                 backgroundColor: 'transparent', // Make the background transparent
//                                 boxShadow: 'none', // Remove the box shadow
//                                 zIndex: 9999,
//                                 display: 'flex',
//                                 flexDirection: 'column', // Stack the icons vertically
//                             }}
//                         >
//                             {/* MUI Buttons */}
//                             <Button onClick={() => handleMenuClick('GM')} variant="contained" color="primary">
//                                 GM
//                             </Button>
//                             <Button onClick={() => handleMenuClick('TOKEN')} variant="contained" color="primary">
//                                 Token
//                             </Button>
//                             <Button onClick={() => handleMenuClick('MAP')} variant="contained" color="primary">
//                                 Map
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 {/*<div className={styles.iconOverlay} onContextMenu={handleContextMenu}>*/}
//                 <div className={styles.draggableicon}>
//                     <Image src={imgsrc} priority={true} alt="Icon" width={width} height={height}
//                            style={{pointerEvents: 'none'}}/>
//                 </div>
//                 {/*</div>*/}
//             </Rnd>
//         );
//     }
// }