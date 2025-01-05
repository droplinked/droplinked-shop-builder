import React from 'react'
import ProductBulkPriceUpdater from '../../ProductBulkPriceUpdater'
import SKUTable from '../SKUTable/SKUTable'
import ProductBulkDimensionsUpdater from './ProductBulkDimensionsUpdater'
import ProductBulkQuantityUpdater from './ProductBulkQuantityUpdater'

function ProductSKUSettings() {
    return (
        <>
            <SKUTable />
            <ProductBulkPriceUpdater />
            <ProductBulkQuantityUpdater />
            <ProductBulkDimensionsUpdater />
        </>
    )
}

export default ProductSKUSettings