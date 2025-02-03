import { DashboardPageData } from 'lib/apis/dashboard/interfaces'
import { create } from 'zustand'

interface DashboardPageLink {
    title: string
    description: string
    link: string
}

interface State {
    dashboardData?: DashboardPageData | null
    blogs: DashboardPageLink[]
    helpLinks: DashboardPageLink[]
    isLoading: boolean
}

interface Action {
    updateDashboardPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetDashboardPageState: () => void
}

const initialState: State = {
    dashboardData: null,
    blogs: [
        { title: "Blog 1", description: "This is blog 1", link: "/blog/1" },
        { title: "Blog 2", description: "This is blog 2", link: "/blog/2" },
        { title: "Blog 3", description: "This is blog 3", link: "/blog/3" },
    ],
    helpLinks: [
        { title: "Help Topic 1", description: "Details about help topic 1", link: "/help/1" },
        { title: "Help Topic 2", description: "Details about help topic 2", link: "/help/2" },
        { title: "Help Topic 3", description: "Details about help topic 3", link: "/help/3" },
    ],
    isLoading: false,
}

const useDashboardPageStore = create<State & Action>((set) => ({
    ...initialState,
    updateDashboardPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetDashboardPageState: () => set(() => ({ ...initialState }))
}))

export default useDashboardPageStore