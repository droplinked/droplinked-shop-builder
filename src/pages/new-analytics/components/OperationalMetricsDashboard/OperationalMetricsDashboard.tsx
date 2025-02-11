import { Flex } from '@chakra-ui/react'
import React from 'react'
import VisitorStats from './VisitorStats'
import InventorySummary from './InventorySummary'

function OperationalMetricsDashboard() {
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            alignItems="start"
            gap={{ base: 4, xl: 6 }}
        >
            <VisitorStats />
            <InventorySummary />
        </Flex>
    )
}

export default OperationalMetricsDashboard