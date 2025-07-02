import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import DigitalProductSKU from '../fields/DigitalProductSKU/DigitalProductSKU'
import PhysicalProductVariants from '../fields/PhysicalProductVariants'
import PODProductVariants from '../fields/POD/PODProductVariants/PODProductVariants'

function ProductVariantsAccordion() {
    const { t } = useLocaleResources('products');
    const { values: { product_type } } = useProductForm()

    const accordionLabel = product_type === "DIGITAL" ? t('accordions.productVariants.priceLabel') : t('accordions.productVariants.priceAndVariantsLabel')

    const VARIANT_CONTENT: Record<ProductType, React.ReactNode> = {
        NORMAL: <PhysicalProductVariants />,
        PRINT_ON_DEMAND: <PODProductVariants />,
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