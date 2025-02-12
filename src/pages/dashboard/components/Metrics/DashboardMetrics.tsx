import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import useDashboardPageStore from 'pages/dashboard/stores/useDashboardStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionsGrid from './ActionsGrid'
import MetricsGrid from './MetricsGrid'

function DashboardMetrics() {
    const navigate = useNavigate()
    const { dashboardData } = useDashboardPageStore()
    const { shopStats } = dashboardData ?? {}

    const metrics = [
        { icon: <CurrencyIcon __css={{ path: { stroke: "#fff" } }} />, label: 'Total Revenue', value: shopStats?.totalRevenue, isPrice: true },
        { icon: <AppIcons.HeaderCoins />, label: 'Net Profit', value: shopStats?.profit, isPrice: true },
        { icon: <AppIcons.Invoice />, label: 'Orders', value: shopStats?.orders, isPrice: false },
        { icon: <AppIcons.User />, label: 'Customers', value: shopStats?.customers, isPrice: false }
    ]

    const actions = [
        { icon: <AppIcons.HeaderProductBox />, label: 'Create Product', onClick: () => navigate("/analytics/products") },
        { icon: <AppIcons.Collection />, label: 'Create Collection', onClick: () => navigate("/analytics/collections") },
        { icon: <AppIcons.Invoice />, label: 'Create Invoice', onClick: () => navigate("/analytics/invoice-management/create") },
        { icon: <AppIcons.Discount />, label: 'Create Discount', onClick: () => navigate("/analytics/account-settings") },
    ]

    return (
        <Flex direction="column" gap={4}>
            <MetricsGrid metrics={metrics} />
            <ActionsGrid actions={actions} />
        </Flex>
    )
}

export default DashboardMetrics