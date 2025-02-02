import { Flex, Text } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { Metric } from 'pages/new-dashboard/types/Metrics'
import React from 'react'

interface MetricDetailsProps {
    metric: Metric
}

function MetricDetails({ metric }: MetricDetailsProps) {
    return (
        <Flex
            direction="column"
            gap={2}
            sx={{ p: { fontSize: { base: 18, lg: 20 }, fontWeight: 500, color: "#fff" } }}
        >
            <Text fontSize={14} color="#fff">{metric.label}</Text>
            {metric.isPrice
                ? <FormattedPrice price={metric.value} abbreviationProps={{ color: '#7B7B7B', fontWeight: 400 }} />
                : <Text>{metric.value}</Text>
            }
        </Flex>
    )
}

export default MetricDetails