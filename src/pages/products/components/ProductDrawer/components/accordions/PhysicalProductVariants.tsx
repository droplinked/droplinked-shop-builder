import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductVariants from '../fields/PhysicalProductVariants/ProductVariants'

function PhysicalProductVariants() {
    return (
        <ProductFormAccordion label='Price & Variants'>
            <ProductVariants />
        </ProductFormAccordion>
    )
}

export default PhysicalProductVariants