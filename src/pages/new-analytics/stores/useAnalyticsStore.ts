import { create } from 'zustand'


interface State {
}

interface Action {
    updateAnalyticsPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetAnalyticsPageState: () => void
}

const initialState: State = {
}

const useAnalyticsStore = create<State & Action>((set) => ({
    ...initialState,
    updateAnalyticsPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetAnalyticsPageState: () => set(() => ({ ...initialState }))
}))

export default useAnalyticsStore