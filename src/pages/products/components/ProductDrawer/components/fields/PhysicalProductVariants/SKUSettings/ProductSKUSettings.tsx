import { Flex } from '@chakra-ui/react'
import React from 'react'
import SKUTable from '../SKUTable/SKUTable'
import BulkPriceAdjuster from './BulkPriceAdjuster'
import BulkQuantityAdjuster from './BulkQuantityAdjuster'

function ProductSKUSettings() {
    return (
        <Flex
            direction="column"
            gap={9}
            mt={5}
        >
            <SKUTable />
            <BulkPriceAdjuster />
            <BulkQuantityAdjuster />
        </Flex>
    )
}

export default ProductSKUSettings