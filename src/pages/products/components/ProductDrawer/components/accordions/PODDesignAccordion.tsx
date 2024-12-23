import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductCatalog from '../fields/POD/PODProductCatalog/ProductCatalog'

function PODDesignAccordion() {
    const { values: { product_type } } = useFormikContext<ProductFormValues>()

    return (
        <ProductFormAccordion
            label='POD Design'
            defaultOpen={product_type === "PRINT_ON_DEMAND"}
        >
            <ProductCatalog />
        </ProductFormAccordion>
    )
}

export default PODDesignAccordion