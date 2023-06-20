import {create} from 'zustand';

const useBattlemapStore = create((set) => ({
  zoomLevel: 1,
  setZoomLevel: (newZoom) => set((state) => ({zoomLevel: newZoom})),
  tokens: [],
  addToken: (token) => set((state) => ({tokens: [...state.tokens, token]})),
  removeToken: (tokenId) =>
    set((state) => ({tokens: state.tokens.filter((token) => token.id !== tokenId)})),
  characterSheets: [],
  addCharacterSheet: (id, name) => set((state) => ({
    characterSheets: [...state.characterSheets, {
      id,
      name,
      isOpen: false
    }]
  })),
  toggleSheetVisibility: (id) => set((state) => ({
    characterSheets: state.characterSheets.map((sheet) =>
      sheet.id === id ? {...sheet, isOpen: !sheet.isOpen} : sheet
    )
  }))
}))

export default useBattlemapStore