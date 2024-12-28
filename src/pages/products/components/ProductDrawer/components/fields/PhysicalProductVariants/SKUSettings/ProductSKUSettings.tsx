import React from 'react'
import SKUTable from '../SKUTable/SKUTable'
import BulkDimensionsAdjuster from './BulkDimensionsAdjuster'
import BulkPriceAdjuster from './BulkPriceAdjuster'
import BulkQuantityAdjuster from './BulkQuantityAdjuster'

function ProductSKUSettings() {
    return (
        <>
            <SKUTable />
            <BulkPriceAdjuster />
            <BulkQuantityAdjuster />
            <BulkDimensionsAdjuster />
        </>
    )
}

export default ProductSKUSettings