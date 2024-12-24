import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import PODProductCatalog from '../fields/POD/PODProductCatalog/PODProductCatalog'
import PODProductTemplate from '../fields/POD/PODProductTemplate/PODProductTemplate'

function PODDesignAccordion() {
    const { values: { product_type } } = useFormikContext<ProductFormValues>()

    return (
        <ProductFormAccordion
            label='POD Design'
            defaultOpen={product_type === "PRINT_ON_DEMAND"}
        >
            <PODProductCatalog />
            <PODProductTemplate />
        </ProductFormAccordion>
    )
}

export default PODDesignAccordion