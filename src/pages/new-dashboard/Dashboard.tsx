import { Flex } from '@chakra-ui/react'
import React from 'react'
import AffiliateMarket from './components/AffiliateMarket'
import CommunityGrid from './components/CommunityGrid'
import DoubleColumnContainer from './components/DoubleColumnContainer'
import GreetingBanner from './components/GreetingBanner'
import MetricsDashboard from './components/Metrics/DashboardMetrics'
import OrderSummary from './components/OrderSummary'
import ResourceGroup from './components/ResourceGroup/ResourceGroup'

function Dashboard() {
    const blogs = [
        { title: "Blog 1", description: "This is blog 1", link: "/blog/1" },
        { title: "Blog 2", description: "This is blog 2", link: "/blog/2" },
        { title: "Blog 3", description: "This is blog 3", link: "/blog/3" },
    ]

    const helpLinks = [
        { title: "Help Topic 1", description: "Details about help topic 1", link: "/help/1" },
        { title: "Help Topic 2", description: "Details about help topic 2", link: "/help/2" },
        { title: "Help Topic 3", description: "Details about help topic 3", link: "/help/3" },
    ]

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