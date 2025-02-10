import { Flex } from '@chakra-ui/react'
import React from 'react'
import AnalyticsSummary from './components/AnalyticsSummary'
import Earnings from './components/Earnings/Earnings'
import InventoryOverview from './components/Earnings/InventoryOverview'
import ProductsOverview from './components/ProductsOverview'
import Visitors from './components/Visitors'

function Analytics() {
    return (
        <Flex
            direction="column"
            gap={{ base: 6, md: 9, lg: 12 }}
        >
            <Earnings />
            <Flex
                direction={{ base: "column", lg: "row" }}
                alignItems="start"
                gap={{ base: 4, xl: 6 }}
            >
                <Visitors />
                <InventoryOverview />
            </Flex>
            <ProductsOverview />
            <AnalyticsSummary />
        </Flex>
    )
}

export default Analytics