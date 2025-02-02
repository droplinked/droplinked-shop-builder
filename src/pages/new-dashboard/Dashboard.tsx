import { Flex } from '@chakra-ui/react'
import React from 'react'
import GreetingBanner from './components/GreetingBanner'
import MetricsDashboard from './components/Metrics/DashboardMetrics'

function Dashboard() {
    return (
        <Flex direction="column" gap={12}>
            <GreetingBanner />
            <MetricsDashboard />
        </Flex>
    )
}

export default Dashboard