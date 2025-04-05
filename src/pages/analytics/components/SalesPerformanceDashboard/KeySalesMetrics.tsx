import { Flex, useMediaQuery } from "@chakra-ui/react"
import { CoinsLg } from "assets/icons/Finance/Coins/CoinsLg"
import { InvoiceLg } from "assets/icons/Finance/Invoice/InvoiceLg"
import { UserLg } from "assets/icons/System/User/UserLg"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import MetricCard from "../MetricCard"

function KeySalesMetrics() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)
    const { netProfit, customers, orders } = data
    const [is1024pxOrAbove] = useMediaQuery('(min-width: 1024px)')

    const metrics = [
        { icon: <CoinsLg color="white" />, title: "Net Profit", totalValue: netProfit.total, directValue: netProfit.directSales, affiliateValue: netProfit.affiliateSales },
        { icon: <UserLg color="white" />, title: "Customers", totalValue: customers.total, directValue: customers.directCustomers, affiliateValue: customers.affiliateCustomers },
        { icon: <InvoiceLg color="white" />, title: "Orders", totalValue: orders.totalOrders, directValue: orders.directOrders, affiliateValue: orders.affiliateOrders }
    ]

    const renderMetricCards = () => (
        metrics.map((metric) => (
            <MetricCard
                key={metric.title}
                icon={metric.icon}
                title={metric.title}
                totalValue={metric.totalValue}
                directValue={metric.directValue}
                affiliateValue={metric.affiliateValue}
                isLoading={isLoading}
            />
        ))
    )

    if (is1024pxOrAbove) return (
        <RuledGrid columns={3} nested>
            {renderMetricCards()}
        </RuledGrid>
    )


    return (
        <Flex
            width="100%"
            direction="column"
            gap={4}
            sx={{
                "& > div": {
                    border: "1px solid #292929",
                    borderRadius: 16
                }
            }}
        >
            {renderMetricCards()}
        </Flex>
    )
}

export default KeySalesMetrics