import { DateRangeValue } from 'components/redesign/date-range-picker/AppDateRangePicker'
import { create } from 'zustand'

const getDefaultDateRange = (): DateRangeValue => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1)
    return [startDate, endDate]
}

interface State {
    selectedDateRange: DateRangeValue
}

interface Action {
    updateAnalyticsPageState: <K extends keyof State>(key: K, value: State[K]) => void
    resetAnalyticsPageState: () => void
}

const initialState: State = {
    selectedDateRange: getDefaultDateRange()
}

const useAnalyticsStore = create<State & Action>((set) => ({
    ...initialState,
    updateAnalyticsPageState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetAnalyticsPageState: () => set(() => ({ ...initialState }))
}))

export default useAnalyticsStore