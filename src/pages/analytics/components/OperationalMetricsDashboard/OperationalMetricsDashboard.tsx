import { Flex, useMediaQuery } from "@chakra-ui/react"
import { getAnalyticsPerformanceReport } from "lib/apis/dashboard/dashboardServices"
import { DEFAULT_PERFORMANCE_DATA } from "pages/analytics/constants/defaultPerformanceData"
import useFormattedDateRange from "pages/analytics/hooks/useFormattedDateRange"
import useAnalyticsStore from "pages/analytics/stores/useAnalyticsStore"
import React, { useEffect } from "react"
import { useQuery } from "react-query"
import KeySalesMetrics from "../SalesPerformanceDashboard/KeySalesMetrics"
import InventorySummary from "./InventorySummary"
import VisitorStats from "./VisitorStats"

function OperationalMetricsDashboard() {
    const [isMobileOrTablet] = useMediaQuery('(max-width: 1279px)')
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
            {isMobileOrTablet && <KeySalesMetrics />}
            <VisitorStats />
            <InventorySummary />
        </Flex>
    )
}

export default OperationalMetricsDashboard