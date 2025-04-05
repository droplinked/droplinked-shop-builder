import { Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import OperationalMetricsDashboard from './components/OperationalMetricsDashboard/OperationalMetricsDashboard'
import ProductEngagementDashboard from './components/ProductEngagementDashboard/ProductEngagementDashboard'
import KeySalesMetrics from './components/SalesPerformanceDashboard/KeySalesMetrics'
import SalesPerformanceDashboard from './components/SalesPerformanceDashboard/SalesPerformanceDashboard'

function Analytics() {
    const [isBelow1024px] = useMediaQuery('(max-width: 1023px)')

    return (
        <Flex direction="column" gap={{ base: 6, md: 9, lg: 12 }}>
            <SalesPerformanceDashboard />
            {isBelow1024px && <KeySalesMetrics />}
            <OperationalMetricsDashboard />
            <ProductEngagementDashboard />
        </Flex>
    )
}

export default Analytics