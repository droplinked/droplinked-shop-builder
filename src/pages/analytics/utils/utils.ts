import { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker"

export const getDefaultDateRange = (): DateRangeValue => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1)
    return [startDate, endDate]
}