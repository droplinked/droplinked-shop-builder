import { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker"
import { PerformanceReportResponse } from "services/dashboard/interfaces"
import { create } from "zustand"
import { DEFAULT_PERFORMANCE_DATA } from "../constants/defaultPerformanceData"
import { getDefaultDateRange } from "../utils/utils"

interface PerformanceReportState {
    data: PerformanceReportResponse
    isLoading: boolean
    isError: boolean
}

interface State {
    selectedDateRange: DateRangeValue
    performanceReportResponse: PerformanceReportState
}

interface Actions {
    updateAnalyticsPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetAnalyticsPageState: () => void
}

const initialState: State = {
    selectedDateRange: getDefaultDateRange(),
    performanceReportResponse: {
        data: DEFAULT_PERFORMANCE_DATA,
        isLoading: false,
        isError: false
    },
}

const useAnalyticsStore = create<State & Actions>((set) => ({
    ...initialState,
    updateAnalyticsPageState: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetAnalyticsPageState: () => set(() => ({ ...initialState })),
}))

export default useAnalyticsStore