import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductCatalog from '../fields/POD/PODProductCatalog/ProductCatalog'
import PODDesignMaker from '../fields/POD/PODProductTemplate/PODDesignMaker'

function PODDesignAccordion() {
    const { values: { product_type } } = useFormikContext<ProductFormValues>()

    return (
        <ProductFormAccordion
            label='POD Design'
            defaultOpen={product_type === "PRINT_ON_DEMAND"}
        >
            <ProductCatalog />
            <PODDesignMaker />
        </ProductFormAccordion>
    )
}

export default PODDesignAccordion