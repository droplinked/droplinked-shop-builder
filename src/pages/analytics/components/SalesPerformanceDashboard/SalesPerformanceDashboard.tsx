import { GridItem, useBreakpointValue } from "@chakra-ui/react"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useFormattedDateRange from "pages/analytics/hooks/useFormattedDateRange"
import React from "react"
import { useQuery } from "react-query"
import { getAnalyticsSalesReport } from "services/dashboard/dashboardServices"
import EarningsSummary from "./EarningsSummary"
import KeySalesMetrics from "./KeySalesMetrics"
import SalesChart from "./SalesChart/SalesChart"

function SalesPerformanceDashboard() {
    const is1024pxOrAbove = useBreakpointValue({ base: false, lg: true })
    const { startDate, endDate } = useFormattedDateRange()
    const { isFetching, data } = useQuery({
        queryKey: ["salesReport", startDate, endDate],
        queryFn: () => getAnalyticsSalesReport({ startDate, endDate })
    })

    const earnings = data?.totalSalesInPeriod
    const salesData = data?.salesData

    return (
        <RuledGrid columns={1} borderRadius={16}>
            {/* Row 1 */}
            <GridItem>
                <EarningsSummary earnings={earnings} isLoading={isFetching} />
            </GridItem>

            {/* Row 2 */}
            <GridItem>
                <SalesChart salesData={salesData} />
            </GridItem>

            {/* Row 3 */}
            {is1024pxOrAbove && (
                <GridItem>
                    <KeySalesMetrics />
                </GridItem>
            )}
        </RuledGrid>
    )
}

export default SalesPerformanceDashboard