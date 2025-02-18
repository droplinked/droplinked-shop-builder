import { Grid } from '@chakra-ui/react'
import { Metric } from 'pages/dashboard/types/Metrics'
import React from 'react'
import MetricCard from './MetricCard'

interface MetricsGridProps {
    metrics: Metric[]
}

function MetricsGrid({ metrics }: MetricsGridProps) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, xl: 6 }}
        >
            {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
            ))}
        </Grid>
    )
}

export default MetricsGrid