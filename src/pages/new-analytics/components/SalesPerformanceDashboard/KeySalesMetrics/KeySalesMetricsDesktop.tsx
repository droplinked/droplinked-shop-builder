import { GridItem } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from "pages/new-analytics/stores/useAnalyticsStore"
import React from "react"
import MetricCard from "../../MetricCard"

function KeySalesMetricsDesktop() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)
    const { netProfit, customers, orders } = data

    return (
        <RuledGrid columns={3} nested>
            <GridItem>
                <MetricCard
                    icon={<AppIcons.HeaderCoins />}
                    title="Net Profit"
                    totalValue={netProfit.total}
                    directValue={netProfit.directSales}
                    affiliateValue={netProfit.affiliateSales}
                    isLoading={isLoading}
                />
            </GridItem>

            <GridItem>
                <MetricCard
                    icon={<AppIcons.User />}
                    title="Customers"
                    totalValue={customers.total}
                    directValue={customers.directCustomers}
                    affiliateValue={customers.affiliateCustomers}
                    isLoading={isLoading}
                />
            </GridItem>

            <GridItem>
                <MetricCard
                    icon={<AppIcons.InvoiceManagement />}
                    title="Orders"
                    totalValue={orders.totalOrders}
                    directValue={orders.directOrders}
                    affiliateValue={orders.affiliateOrders}
                    isLoading={isLoading}
                />
            </GridItem>
        </RuledGrid>
    )
}

export default KeySalesMetricsDesktop