import useFormattedDateRange from "pages/analytics/hooks/useFormattedDateRange"
import useAnalyticsStore from "pages/analytics/stores/useAnalyticsStore"
import React from "react"
import { useQuery } from "react-query"
import { getAnalyticsPerformanceReport } from "services/dashboard/dashboardServices"
import InventorySummary from "./InventorySummary"

function OperationalMetricsDashboard() {
    const { startDate, endDate } = useFormattedDateRange()
    const setPerformanceReportResponse = useAnalyticsStore(state => state.setPerformanceReportResponse)
    useQuery({
        queryKey: ["performanceReport", startDate, endDate],
        queryFn: () => {
            setPerformanceReportResponse("isLoading", true)
            return getAnalyticsPerformanceReport({ startDate, endDate })
        },
        onSuccess: (data) => setPerformanceReportResponse("data", data),
        onError: () => setPerformanceReportResponse("isError", true),
        onSettled: () => setPerformanceReportResponse("isLoading", false)
    })

    // return (
    //     <Grid
    //         templateColumns={{ base: "1fr", lg: "minmax(0, 50%) 1fr", "3xl": "444px 1fr" }}
    //         alignItems="start"
    //         gap={{ base: 4, "2xl": 6 }}
    //     >
    //         <VisitorStats />
    //         <InventorySummary />
    //     </Grid>
    // )
    return <InventorySummary />
}

export default OperationalMetricsDashboard