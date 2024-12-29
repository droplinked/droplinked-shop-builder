import useProductForm from 'pages/products/hooks/useProductForm'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import DigitalProductSKU from '../fields/DigitalProductSKU/DigitalProductSKU'
import PhysicalProductVariants from '../fields/PhysicalProductVariants'

function ProductVariantsAccordion() {
    const { values: { product_type } } = useProductForm()

    const accordionLabel = product_type === "DIGITAL" ? "Price" : "Price & Variants"

    const VARIANT_CONTENT: Record<ProductType, React.ReactNode> = {
        NORMAL: <PhysicalProductVariants />,
        PRINT_ON_DEMAND: <PhysicalProductVariants />,
        DIGITAL: <DigitalProductSKU />,
        EVENT: <PhysicalProductVariants />
    }

    return (
        <ProductFormAccordion label={accordionLabel}>
            {VARIANT_CONTENT[product_type]}
        </ProductFormAccordion>
    )
}

export default ProductVariantsAccordion