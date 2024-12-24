import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'
import PODDesignMaker from './PODDesignMaker'

function PODProductTemplate() {
    const { values: { pod_blank_product_id } } = useFormikContext<ProductFormValues>()

    if (!pod_blank_product_id) return null

    return (
        <ProductFieldWrapper
            label="Product Template"
            description="Utilize the Design Maker tool to create product mockups with artwork placement."
            isRequired
        >
            <PODDesignMaker />
        </ProductFieldWrapper>
    )
}

export default PODProductTemplate