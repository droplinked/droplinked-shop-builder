import { Flex } from '@chakra-ui/react'
import React from 'react'
import QuickActionsGrid from './QuickActionsGrid'
import RevenueStatsGrid from './RevenueStatsGrid'

function DashboardSummary() {
    return (
        <Flex direction="column" gap={4}>
            <RevenueStatsGrid />
            <QuickActionsGrid />
        </Flex>
    )
}

export default DashboardSummary