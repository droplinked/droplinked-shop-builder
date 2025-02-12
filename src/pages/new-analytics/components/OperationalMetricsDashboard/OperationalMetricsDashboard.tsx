import { Flex } from "@chakra-ui/react"
import { getAnalyticsPerformanceReport } from "lib/apis/dashboard/dashboardServices"
import { DEFAULT_PERFORMANCE_DATA } from "pages/new-analytics/constants/defaultPerformanceData"
import useFormattedDateRange from "pages/new-analytics/hooks/useFormattedDateRange"
import useAnalyticsStore from "pages/new-analytics/stores/useAnalyticsStore"
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
        <Flex
            direction={{ base: "column", lg: "row" }}
            alignItems="start"
            gap={{ base: 4, xl: 6 }}
        >
            <VisitorStats />
            <InventorySummary />
        </Flex>
    )
}

export default OperationalMetricsDashboard