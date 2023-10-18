import {create} from 'zustand';

export const TOOL_ENUM = {
    SELECT: "SELECT",
    DRAG: "DRAG",
    DRAW: "DRAW",
    REVEAL: "FOW",
    RULER: "RULER",
    TEXT: "TEXT",
    LAYERS: "LAYERS"
}

export const DRAW_ENUM = {
    PEN: "PEN",
    CIRCLE: "CIRCLE",
    RECTANGLE: "RECTANGLE",
    TRIANGLE: "TRIANGLE",
    LABEL: "TEXT",
    POLYGON: "POLYGON",
    IMAGE: "IMAGE"
}

export const FOW_ENUM = {
    REVEAL: "REVEAL",
    HIDE: "HIDE"
}

const useBattlemapStore = create((set) => ({
    zoomLevel: 1,
    setZoomLevel: (newZoom) =>
        set((state) => ({zoomLevel: newZoom})),

    characterSheetWindows: [],
    addCharacterSheetWindow: (sheet) =>
        set((state) => ({characterSheetWindows: [...state.characterSheetWindows, sheet]})),
    removeCharacterSheetWindow: (sheet) =>
        set((state) => ({characterSheetWindows: state.characterSheetWindows.filter((item) => item.id !== sheet.id)})),


    monsterBlocks: [],
    addMonsterBlock: (slug) => (
        set((state) => ({monsterBlocks: [...state.monsterBlocks, {slug: slug}]}))
    ),
    removeMonsterBlock: (slug) =>
        set((state) => ({monsterBlocks: state.monsterBlocks.filter((monster) => monster.slug !== slug)})),

    spellCards: [],
    addSpellCard: (slug) =>
        set((state) => (
            {spellCards: [...state.spellCards, {slug: slug}]}
        )),
    removeSpellCard: (slug) =>
        set((state) => ({spellCards: state.spellCards.filter((spell) => spell.slug !== slug)})),

    magicItemCards: [],
    addMagicItemCard: (slug) =>
        set((state) => ({magicItemCards: [...state.magicItemCards, {slug: slug}]})),
    removeMagicItemCard: (slug) =>
        set((state) => ({magicItemCards: state.magicItemCards.filter((item) => item.slug !== slug)})),

    weaponCards: [],
    addWeaponCard: (slug) =>
        set((state) => ({weaponCards: [...state.weaponCards, {slug: slug}]})),
    removeWeaponCard: (slug) =>
        set((state) => ({weaponCards: state.weaponCards.filter((weapon) => weapon.slug !== slug)})),

    armorCards: [],
    addArmorCard: (slug) =>
        set((state) => ({armorCards: [...state.armorCards, {slug: slug}]})),
    removeArmorCard: (slug) =>
        set((state) => ({armorCards: state.armorCards.filter((armor) => armor.slug !== slug)})),


    conditionCards: [],
    addConditionCard: (slug) =>
        set((state) => ({conditionCards: [...state.conditionCards, {slug: slug}]})),
    removeConditionCard: (slug) =>
        set((state) => ({conditionCards: state.conditionCards.filter((condition) => condition.slug !== slug)})),

    ashOfWarCards: [],
    addAshOfWarCard: (slug) =>
        set((state) => ({ashOfWarCards: [...state.ashOfWarCards, {slug: slug}]})),
    removeAshOfWarCard: (slug) =>
        set((state) => ({ashOfWarCards: state.ashOfWarCards.filter((ashofwar) => ashofwar.slug !== slug)})),

    gameMode: "",
    setGameMode: (mode) =>
        set((state) => ({gameMode: mode})),

    gameID: "",
    setGameID: (id) =>
        set((state) => ({gameID: id})),

    playerID: "",
    setPlayerID: (id) =>
        set((state) => ({playerID: id})),

    activeMap: "",
    setActiveMap: (map) =>
        set((state) => ({activeMap: map})),

    playingSong: "",
    setPlayingSong: (song) =>
        set((state) => ({playingSong: song})),

    selectedTokenID: "",
    setSelectedTokenID: (id) =>
        set((state) => ({selectedTokenID: id})),

    selectedTool: TOOL_ENUM.SELECT,
    setSelectedTool: (tool) =>
        set((state) => ({selectedTool: tool})),

    mapLayer: "TOKEN",
    setMapLayer: (layer) =>
        set((state) => ({mapLayer: layer})),

    drawTool: "PEN",
    setDrawTool: (tool) =>
        set((state) => ({drawTool: tool})),

    fogOfWarMode: "REVEAL",
    setFogOfWarMode: (mode) =>
        set((state) => ({fogOfWarMode: mode})),

    gamePlayers: [],
    setGamePlayers: (players) =>
        set((state) => ({gamePlayers: players})),

    isSongPlaying: false,
    setIsSongPlaying: (playing) =>
        set((state) => ({isSongPlaying: playing})),
}))

useBattlemapStore.subscribe((state) => console.log('New state:', state));


export default useBattlemapStore