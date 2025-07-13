import { DateRangeValue } from 'components/redesign/date-range-picker/AppDateRangePicker'
import { ITransactionType } from 'services/credit/interfaces'
import { create } from 'zustand'

interface State {
    date: DateRangeValue
    selectedFilter: ITransactionType
    isFetching: boolean
    analyticsData: any
}

interface Action {
    updateCreditState: <K extends keyof State>(key: K, value: State[K]) => void
    resetCreditState: () => void
}

const initialState: State = {
    date: (() => {
        const endDate = new Date()
        const startDate = new Date()
        startDate.setFullYear(startDate.getFullYear() - 1)
        return [startDate, endDate]
    })(),
    selectedFilter: null,
    isFetching: false,
    analyticsData: null
}

const useCreditStore = create<State & Action>((set) => ({
    ...initialState,
    updateCreditState: (key, value) => set(state => ({ ...state, [key]: value })),
    resetCreditState: () => set(() => ({ ...initialState }))
}))

export default useCreditStore
