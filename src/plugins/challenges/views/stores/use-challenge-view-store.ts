import { create } from 'zustand'

type ViewType = 'classic' | 'chat'

interface ChallengeViewState {
  currentView: ViewType
  setView: (view: ViewType) => void
  toggleView: () => void
}

export const useChallengeViewStore = create<ChallengeViewState>((set) => ({
  currentView: 'classic',
  setView: (view) => set({ currentView: view }),
  toggleView: () => set((state) => ({
    currentView: state.currentView === 'classic' ? 'chat' : 'classic'
  }))
}))