import { Flex } from '@chakra-ui/react'
import React from 'react'
import OperationalMetricsDashboard from './components/OperationalMetricsDashboard/OperationalMetricsDashboard'
import ProductEngagementDashboard from './components/ProductEngagementDashboard/ProductEngagementDashboard'
import SalesPerformanceDashboard from './components/SalesPerformanceDashboard/SalesPerformanceDashboard'

function Analytics() {
    return (
        <Flex
            direction="column"
            gap={{ base: 6, md: 9, lg: 12 }}
        >
            <SalesPerformanceDashboard />
            <OperationalMetricsDashboard />
            <ProductEngagementDashboard />
        </Flex>
    )
}

export default Analytics