import { GridItem } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from "pages/new-analytics/stores/useAnalyticsStore"
import React from "react"
import MetricCard from "../../MetricCard"

function KeySalesMetricsDesktop() {
    const performanceData = useAnalyticsStore(state => state.performanceReportResponse.data)

    return (
        <RuledGrid columns={3} nested>
            <GridItem>
                <MetricCard
                    icon={<AppIcons.HeaderCoins />}
                    title="Net Profit"
                    totalValue={performanceData.netProfit.total}
                    directValue={performanceData.netProfit.directSales}
                    affiliateValue={performanceData.netProfit.affiliateSales}
                />
            </GridItem>

            <GridItem>
                <MetricCard
                    icon={<AppIcons.User />}
                    title="Customers"
                    totalValue={performanceData.customers.total}
                    directValue={performanceData.customers.directCustomers}
                    affiliateValue={performanceData.customers.affiliateCustomers}
                />
            </GridItem>

            <GridItem>
                <MetricCard
                    icon={<AppIcons.InvoiceManagement />}
                    title="Orders"
                    totalValue={performanceData.orders.totalOrders}
                    directValue={performanceData.orders.directOrders}
                    affiliateValue={performanceData.orders.affiliateOrders}
                />
            </GridItem>
        </RuledGrid>
    )
}

export default KeySalesMetricsDesktop