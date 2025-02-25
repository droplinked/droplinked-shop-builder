import { Flex, useMediaQuery } from "@chakra-ui/react"
import AppIcons from 'assets/icon/Appicons'
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import MetricCard from "../MetricCard"

function KeySalesMetrics() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)
    const { netProfit, customers, orders } = data
    const [isLargerThanLg] = useMediaQuery('(min-width: 1280px)')

    const metrics = [
        { icon: <AppIcons.HeaderCoins />, title: "Net Profit", totalValue: netProfit.total, directValue: netProfit.directSales, affiliateValue: netProfit.affiliateSales },
        { icon: <AppIcons.User />, title: "Customers", totalValue: customers.total, directValue: customers.directCustomers, affiliateValue: customers.affiliateCustomers },
        { icon: <AppIcons.InvoiceManagement />, title: "Orders", totalValue: orders.totalOrders, directValue: orders.directOrders, affiliateValue: orders.affiliateOrders }
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

    if (isLargerThanLg) {
        return (
            <RuledGrid columns={3} nested>
                {renderMetricCards()}
            </RuledGrid>
        )
    }

    return (
        <Flex
            width="100%"
            direction="column"
            gap={4}
            sx={{
                "& > *:first-child": {
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