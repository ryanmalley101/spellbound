import {create} from 'zustand';

const useBattlemapStore = create((set) => ({
  zoomLevel: 1,
  setZoomLevel: (newZoom) => set((state) => ({zoomLevel: newZoom})),

  tokens: [],
  addToken: (token) => set((state) => ({
    tokens: [...state.tokens, token]
  })),
  removeToken: (tokenId) =>
    set((state) => ({tokens: state.tokens.filter((token) => token.id !== tokenId)})),


  characterSheetWindows: [],
  addCharacterSheetWindow: (sheet) => set((state) => ({
    characterSheetWindows: [...state.characterSheetWindows, sheet]
  })),
  removeCharacterSheetWindow: (sheet) =>
    set((state) => ({characterSheetWindows: state.characterSheetWindows.filter((item) => item.id !== sheet.id)})),


  monsterBlocks: [],
  addMonsterBlock: (slug) => set((state) => ({
    monsterBlocks: [...state.monsterBlocks, {
      slug: slug
    }]
  })),
  removeMonsterBlock: (slug) =>
    set((state) => ({monsterBlocks: state.monsterBlocks.filter((slug) => slug !== slug)})),
}))

export default useBattlemapStore