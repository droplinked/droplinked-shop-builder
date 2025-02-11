import { formatDateLongStyle } from "lib/utils/helpers/helpers"
import useAnalyticsStore from "../stores/useAnalyticsStore"

function useFormattedDateRange() {
    const selectedDateRange = useAnalyticsStore(state => state.selectedDateRange)

    let startDate = ''
    let endDate = ''

    if (Array.isArray(selectedDateRange)) {
        // If it's an array, the first element is the start date and the second is the end date
        const [start, end] = selectedDateRange
        startDate = start ? formatDateLongStyle(start) : ''
        endDate = end ? formatDateLongStyle(end) : ''
    }
    else {
        // If it's a single Date or null, treat it as the start date (with no end date)
        startDate = selectedDateRange ? formatDateLongStyle(selectedDateRange) : ''
    }

    return { startDate, endDate }
}

export default useFormattedDateRange