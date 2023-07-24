import {create} from 'zustand';
import {shallow} from "zustand/shallow";

const useBattlemapStore = create((set) => ({
  zoomLevel: 1,
  setZoomLevel: (newZoom) =>
    set((state) => ({zoomLevel: newZoom})),

  mapTokens: [],
  setMapTokens: (tokens) =>
    set((state) => ({mapTokens: tokens})),
  updateMapToken: (updatedToken) =>
    set((state) => ({mapTokens: state.mapTokens.map((token) => token.id === updatedToken.id ? updatedToken : token)})),
  addMapToken: (newToken) =>
    set((state) => ({mapTokens: [...state.mapTokens, newToken]})),

  characterSheetWindows: [],
  addCharacterSheetWindow: (sheet) =>
    set((state) => ({characterSheetWindows: [...state.characterSheetWindows, sheet]})),
  removeCharacterSheetWindow: (sheet) =>
    set((state) => ({characterSheetWindows: state.characterSheetWindows.filter((item) => item.id !== sheet.id)})),


  monsterBlocks: [],
  addMonsterBlock: (slug) =>
    set((state) => ({monsterBlocks: [...state.monsterBlocks, {slug: slug}]})),
  removeMonsterBlock: (slug) =>
    set((state) => ({monsterBlocks: state.monsterBlocks.filter((slug) => slug !== slug)})),

  gameID: "",
  setGameID: (id) =>
    set((state) => ({gameID: id})),

  playerID: "",
  setPlayerID: (id) =>
    set((state) => ({playerID: id})),

  activeMap: "",
  setActiveMap: (map) =>
    set((state) => ({activeMap: map})),
}))

export default useBattlemapStore