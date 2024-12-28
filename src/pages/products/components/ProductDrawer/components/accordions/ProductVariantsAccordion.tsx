import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import PhysicalProductVariants from '../fields/PhysicalProductVariants'

function ProductVariantsAccordion() {
    return (
        <ProductFormAccordion label='Price & Variants'>
            <PhysicalProductVariants />
        </ProductFormAccordion>
    )
}

export default ProductVariantsAccordion