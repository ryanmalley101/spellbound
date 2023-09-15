import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/DraggableWindow.module.css'
import 'react-resizable/css/styles.css';
import {Rnd} from "react-rnd";
import CharacterSheet from "@/components/gameComponents/charactersheet";
import {BsX} from "react-icons/bs";
import useBattlemapStore from "@/stores/battlemapStore";
import MonsterSheet from "@/components/gameComponents/monstersheet";
import SpellCard from "@/components/gameComponents/spellcard";
import MagicItemCard from "@/components/gameComponents/magicitemcard";
import WeaponCard from "@/components/gameComponents/weaponcard";
import ArmorCard from "@/components/gameComponents/armorcard";
import ConditionCard from "@/components/gameComponents/conditioncard";
import AshOfWarCard from "@/components/gameComponents/ashofwarcard";
import NewWindow from "react-new-window";
import {BiWindows} from "react-icons/bi";

const ConditionalWrapper = ({condition, wrapper, children}) => {
    console.log(condition, wrapper, children)
    if (condition) {
        return wrapper(children)
    }
    return children
}

const DraggableWindow = ({initialPosition, content, onClose, title, initialWidth, initialHeight}) => {
    const [windowPosition, setWindowPosition] = useState({x: 0, y: 0});
    const [containerWidth, setContainerWidth] = useState(initialWidth ? initialWidth : 820);
    const [containerHeight, setContainerHeight] = useState(initialHeight ? initialHeight : 800);
    const [headerWidth, setHeaderWidth] = useState(initialWidth ? initialWidth : 820)
    const [portal, setPortal] = useState(false)
    // const [headerHeight, setHeaderHeight] = useState(45)
    const dragStartRef = useRef(null); // Define the dragStartRef using useRef
    const [isHidden, setIsHidden] = useState(false);
    const headerHeight = 45; // Adjust this value based on your header's actual height
    const [ready, setReady] = useState(false)

    const togglePortal = () => {
        portal ? setPortal(false) : setPortal(true)
    }

    const handleDoubleClick = () => {
        setIsHidden((prevState) => !prevState);
    };

    const handleResize = (e, direction, ref) => {
        const {width, height} = ref.style;
        if (isHidden) {
            setHeaderWidth(parseInt(width))
        } else {
            setContainerWidth(parseInt(width));
            setContainerHeight(parseInt(height));
        }
    };

    const handleDragStart = () => {
        dragStartRef.current = {x: windowPosition.x, y: windowPosition.y};
        console.log('Handling drag start')
    };

    const handleDragStop = (e, d) => {
        console.log('Handling drag stop')
        const {x, y} = d;
        const dragStart = dragStartRef.current;

        if (dragStart && (Math.abs(x - dragStart.x) > 2 || Math.abs(y - dragStart.y) > 2)) {
            const adjustedX = (x).toFixed(1);
            const adjustedY = (y).toFixed(1);
            setWindowPosition({x: parseFloat(adjustedX), y: parseFloat(adjustedY)});
        }

        dragStartRef.current = null;
    };

    useEffect(() => {
        if (initialPosition) {
            setWindowPosition({x: initialPosition.x, y: initialPosition.y})
        }
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            setPortal(false)
        });
    }, []); // Empty dependency array to run the effect only once

    const closeWindow = () => {
        console.log('Closing Window')
        onClose()
    }

    if (portal) {
        return (
            <ConditionalWrapper condition={portal}
                                wrapper={children => <NewWindow onUnload={onClose}>{children}</NewWindow>}>
                <Rnd
                    size={{
                        width: isHidden ? headerWidth : containerWidth,
                        height: isHidden ? headerHeight : containerHeight
                    }}
                    position={{
                        x: windowPosition.x,
                        y: windowPosition.y
                    }} // Set the initial position of the component
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    style={{
                        zIndex: 20,
                        backgroundColor: 'white'
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setWindowPosition({
                            x: parseFloat((position.x).toFixed(1)),
                            y: parseFloat((position.y).toFixed(1)),
                        });
                    }}
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
                    dragHandleClassName={styles.header}
                >
                    <div className={styles.windowContainer}>
                        <div className={styles.header} onDoubleClick={handleDoubleClick}>
                            <div className={styles.headerTitle}>{title}</div>
                            <div className={styles.headerClose}>
                                <button className={styles.closeButton} onClick={togglePortal}>
                                    <BiWindows/>
                                </button>
                                <button className={styles.closeButton} onClick={closeWindow}>
                                    <BsX className={styles.closeIcon}/>
                                </button>
                            </div>
                        </div>
                        <div className={styles.subContainer} style={{display: isHidden ? 'none' : 'block'}}>
                            {content}
                        </div>
                    </div>
                </Rnd>
            </ConditionalWrapper>
        );
    }
    return (
        <Rnd
            size={{
                width: isHidden ? headerWidth : containerWidth,
                height: isHidden ? headerHeight : containerHeight
            }}
            position={{
                x: windowPosition.x,
                y: windowPosition.y
            }} // Set the initial position of the component
            onDragStart={handleDragStart}
            onDragStop={handleDragStop}
            style={{
                zIndex: 20,
                backgroundColor: 'white'
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWindowPosition({
                    x: parseFloat((position.x).toFixed(1)),
                    y: parseFloat((position.y).toFixed(1)),
                });
            }}
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
            dragHandleClassName={styles.header}
        >
            <div className={styles.windowContainer}>
                <div className={styles.header} onDoubleClick={handleDoubleClick}>
                    <div className={styles.headerTitle}>{title}</div>
                    <div className={styles.headerClose}>
                        <button className={styles.closeButton} onClick={togglePortal}>
                            <BiWindows/>
                        </button>
                        <button className={styles.closeButton} onClick={closeWindow}>
                            <BsX className={styles.closeIcon}/>
                        </button>
                    </div>
                </div>
                <div className={styles.subContainer} style={{display: isHidden ? 'none' : 'block'}}>
                    {content}
                </div>
            </div>
        </Rnd>
    )
}

const DraggableCharacterWindow = ({characterSheet}) => {
    const removeCharacterSheetWindow = useBattlemapStore(state => state.removeCharacterSheetWindow)
    const characterSheets = useBattlemapStore((state) => state.characterSheetWindows)

    const onClose = () => {
        console.log(`Closing character sheet window ${characterSheet.id}`)
        console.log(characterSheets)
        removeCharacterSheetWindow(characterSheet)
    }

    return <DraggableWindow content={<CharacterSheet characterSheetInput={characterSheet}/>} onClose={onClose}
                            title={characterSheet.name}/>
}

const DraggableMonsterWindow = ({initialPosition, slug}) => {

    const removeMonsterBlock = useBattlemapStore(state => state.removeMonsterBlock)

    const onClose = () => {
        console.log(`Closing monster window ${slug}`)
        removeMonsterBlock(slug)
    }
    const {gameID, playerID} = useBattlemapStore();

    return <DraggableWindow content={<MonsterSheet slug={slug} playerId={playerID} gameId={gameID} rollable={true}/>}
                            onClose={onClose} title={slug}/>
}

const DraggableSpellWindow = ({slug}) => {
    const removeSpellCard = useBattlemapStore(state => state.removeSpellCard)

    const onClose = () => {
        console.log(`Closing spell card ${slug}`)
        removeSpellCard(slug)
    }

    return <DraggableWindow content={<SpellCard slug={slug}/>} onClose={onClose} title={slug} initialWidth={300}
                            initialHeight={300}/>
}

const DraggableMagicItemWindow = ({slug}) => {
    const removeMagicItemCard = useBattlemapStore(state => state.removeMagicItemCard)

    const onClose = () => {
        console.log(`Closing spell card ${slug}`)
        removeMagicItemCard(slug)
    }

    return <DraggableWindow content={<MagicItemCard slug={slug}/>} onClose={onClose} title={slug} initialWidth={300}
                            initialHeight={300}/>
}

const DraggableWeaponWindow = ({slug}) => {
    const removeWeaponCard = useBattlemapStore(state => state.removeWeaponCard)

    const onClose = () => {
        console.log(`Closing weapon card ${slug}`)
        removeWeaponCard(slug)
    }

    return <DraggableWindow content={<WeaponCard slug={slug}/>} onClose={onClose} title={slug} initialWidth={300}
                            initialHeight={300}/>
}

const DraggableArmorWindow = ({slug}) => {
    const removeArmorCard = useBattlemapStore(state => state.removeArmorCard)

    const onClose = () => {
        console.log(`Closing armor card ${slug}`)
        removeArmorCard(slug)
    }

    return <DraggableWindow content={<ArmorCard slug={slug}/>} onClose={onClose} title={slug} initialWidth={300}
                            initialHeight={300}/>
}

const DraggableConditionWindow = ({slug}) => {
    const removeConditionCard = useBattlemapStore(state => state.removeConditionCard)

    const onClose = () => {
        console.log(`Closing condition card ${slug}`)
        removeConditionCard(slug)
    }

    return <DraggableWindow content={<ConditionCard slug={slug}/>} onClose={onClose} title={slug} initialWidth={300}
                            initialHeight={300}/>
}

const DraggableAshOfWarWindow = ({slug}) => {
    const removeAshOfWarCard = useBattlemapStore(state => state.removeAshOfWarCard)

    const onClose = () => {
        console.log(`Closing condition card ${slug}`)
        removeAshOfWarCard(slug)
    }

    return <DraggableWindow content={<AshOfWarCard slug={slug}/>} onClose={onClose} title={slug}
                            initialWidth={300}
                            initialHeight={300}/>
}

export default DraggableWindow
export {
    DraggableCharacterWindow,
    DraggableMonsterWindow,
    DraggableSpellWindow,
    DraggableMagicItemWindow,
    DraggableWeaponWindow,
    DraggableArmorWindow,
    DraggableConditionWindow,
    DraggableAshOfWarWindow
}