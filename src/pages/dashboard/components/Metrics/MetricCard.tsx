import { Flex } from '@chakra-ui/react'
import { Metric } from 'pages/dashboard/types/Metrics'
import React from 'react'
import MetricDetails from './MetricDetails'
import MetricIcon from './MetricIcon'

interface MetricCardProps {
    metric: Metric
}

function MetricCard({ metric }: MetricCardProps) {
    return (
        <Flex
            direction="column"
            gap={{ base: 4, md: 6 }}
            border="1px solid #292929"
            borderRadius={16}
            padding={{ base: 4, lg: 6 }}
        >
            <MetricIcon icon={metric.icon} />
            <MetricDetails metric={metric} />
        </Flex>
    )
}

export default MetricCard