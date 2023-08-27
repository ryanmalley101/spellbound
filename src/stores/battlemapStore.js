import {create} from 'zustand';
import {shallow} from "zustand/shallow";

export const TOOL_ENUM = {
  SELECT: "SELECT",
  DRAG: "DRAG",
  DRAW: "DRAW",
  REVEAL: "REVEAL",
  RULER: "RULER",
  TEXT: "TEXT"
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
    set((state) => ({monsterBlocks: state.monsterBlocks.filter((monster) => monster !== slug)})),

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

  gamePlayers: [],
  setGamePlayers: (players) =>
    set((state) => ({gamePlayers: players})),
}))

useBattlemapStore.subscribe((state) => console.log('New state:', state));


export default useBattlemapStore