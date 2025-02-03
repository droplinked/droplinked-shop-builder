import { Flex } from '@chakra-ui/react'
import React from 'react'
import AffiliateMarket from './components/AffiliateMarket'
import CommunityGrid from './components/CommunityGrid'
import DoubleColumnContainer from './components/DoubleColumnContainer'
import GreetingBanner from './components/GreetingBanner'
import MetricsDashboard from './components/Metrics/DashboardMetrics'
import OrderSummary from './components/OrderSummary'
import ResourceGroup from './components/ResourceGroup/ResourceGroup'
import useDashboardPageData from './hooks/useDashboardPageData'
import useDashboardPageStore from './stores/useDashboardStore'

function Dashboard() {
    const { isFetching } = useDashboardPageData()
    const { blogs, helpLinks } = useDashboardPageStore()

    return (
        <Flex direction="column" gap={12}>
            <GreetingBanner />
            <MetricsDashboard />

            <DoubleColumnContainer>
                <OrderSummary />
                <AffiliateMarket />
            </DoubleColumnContainer>

            <CommunityGrid />

            <DoubleColumnContainer>
                <ResourceGroup title="Blog" items={blogs} />
                <ResourceGroup title="Help Center" items={helpLinks} />
            </DoubleColumnContainer>
        </Flex>
    )
}

export default Dashboard