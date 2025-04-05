import { Grid } from "@chakra-ui/react"
import { getAnalyticsPerformanceReport } from "lib/apis/dashboard/dashboardServices"
import { DEFAULT_PERFORMANCE_DATA } from "pages/analytics/constants/defaultPerformanceData"
import useFormattedDateRange from "pages/analytics/hooks/useFormattedDateRange"
import useAnalyticsStore from "pages/analytics/stores/useAnalyticsStore"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import InventorySummary from "./InventorySummary"
import VisitorStats from "./VisitorStats"

function OperationalMetricsDashboard() {
    const { startDate, endDate } = useFormattedDateRange()
    const updateAnalyticsPageState = useAnalyticsStore(state => state.updateAnalyticsPageState)
    const { isFetching, isError, data } = useQuery({
        queryKey: ["performanceReport", startDate, endDate],
        queryFn: () => getAnalyticsPerformanceReport({ startDate, endDate })
    })

    useEffect(() => {
        updateAnalyticsPageState("performanceReportResponse", {
            data: data ?? DEFAULT_PERFORMANCE_DATA,
            isLoading: isFetching,
            isError
        })
    }, [data, isFetching, isError, updateAnalyticsPageState])

    return (
        <Grid
            templateColumns={{ base: "1fr", lg: "minmax(0, 50%) 1fr", "3xl": "444px 1fr" }}
            alignItems="start"
            gap={{ base: 4, "2xl": 6 }}
        >
            <VisitorStats />
            <InventorySummary />
        </Grid>
    )
}

export default OperationalMetricsDashboard