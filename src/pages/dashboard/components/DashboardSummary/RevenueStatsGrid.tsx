import { Flex } from '@chakra-ui/react'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { InvoiceLg } from 'assets/icons/Finance/Invoice/InvoiceLg'
import { UserLg } from 'assets/icons/System/User/UserLg'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useDashboardPageStore from 'pages/dashboard/stores/useDashboardStore'
import React from 'react'
import DashboardSummaryGrid from './DashboardSummaryGrid'
import RevenueStatDetails from './RevenueStatDetails'

function RevenueStatsGrid() {
    const { isLoading, dashboardData: { shopStats } } = useDashboardPageStore()
    const { t } = useLocaleResources("dashboardPage")

    const stats = [
        { icon: <CurrencyIcon color='white' size='lg' />, label: t('RevenueStatsGrid.totalRevenue'), value: shopStats?.totalRevenue, isPrice: true },
        { icon: <CoinsLg color='white' />, label: t('netProfit'), value: shopStats?.profit, isPrice: true },
        { icon: <InvoiceLg color='white' />, label: t('orders'), value: shopStats?.orders, isPrice: false },
        { icon: <UserLg color='white' />, label: t('customers'), value: shopStats?.customers, isPrice: false }
    ]

    return (
        <DashboardSummaryGrid>
            {stats.map((stat, index) => (
                <Flex
                    key={index}
                    direction="column"
                    gap={{ base: 4, md: 6 }}
                    border="1px solid"
                    borderColor="neutral.gray.800"
                    borderRadius={16}
                    padding={{ base: 4, xl: 6 }}
                >
                    <IconWrapper icon={stat.icon} />
                    <RevenueStatDetails stat={stat} isLoading={isLoading} />
                </Flex>
            ))}
        </DashboardSummaryGrid>
    )
}

export default RevenueStatsGrid