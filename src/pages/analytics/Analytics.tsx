import { Flex, useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/analytics/ar.json'
import enLocale from 'locales/analytics/en.json'
import React from 'react'
import OperationalMetricsDashboard from './components/OperationalMetricsDashboard/OperationalMetricsDashboard'
import ProductEngagementDashboard from './components/ProductEngagementDashboard/ProductEngagementDashboard'
import KeySalesMetrics from './components/SalesPerformanceDashboard/KeySalesMetrics'
import SalesPerformanceDashboard from './components/SalesPerformanceDashboard/SalesPerformanceDashboard'

function Analytics() {
    const isBelow1024px = useBreakpointValue({ base: true, lg: false })
    useLocaleResources("analyticsPage", { en: enLocale, ar: arLocale })

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