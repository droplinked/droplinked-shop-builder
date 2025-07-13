import { DashboardPageData } from 'services/dashboard/interfaces'
import { create } from 'zustand'
interface State {
    dashboardData?: Partial<DashboardPageData>
    isLoading: boolean
}

interface Action {
    updateDashboardPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetDashboardPageState: () => void
}

const initialState: State = {
    dashboardData: {},
    isLoading: true
}

const useDashboardPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateDashboardPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetDashboardPageState: () => set(() => ({ ...initialState }))
}))

export default useDashboardPageStore