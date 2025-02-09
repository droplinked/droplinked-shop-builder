import { Flex } from '@chakra-ui/react'
import React from 'react'
import AnalyticsSummary from './components/AnalyticsSummary'
import Earnings from './components/Earnings/Earnings'
import InventoryOverview from './components/Earnings/InventoryOverview'
import ProductsOverview from './components/ProductsOverview'
import Visitors from './components/Visitors'

function Analytics() {
    return (
        <Flex direction="column" gap={4}>
            <Earnings />
            <Flex gap={6}>
                <Visitors />
                <InventoryOverview />
            </Flex>
            <ProductsOverview />
            <AnalyticsSummary />
        </Flex>
    )
}

export default Analytics