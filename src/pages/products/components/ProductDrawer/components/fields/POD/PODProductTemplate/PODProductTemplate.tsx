import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import PODDesignMaker from './PODDesignMaker'

function PODProductTemplate() {
    const { values: { pod_blank_product_id } } = useProductForm()

    if (!pod_blank_product_id) return null

    return (
        <FormFieldWrapper
            label="Product Template"
            description="Utilize the Design Maker tool to create product mockups with artwork placement."
            isRequired
        >
            <PODDesignMaker />
        </FormFieldWrapper>
    )
}

export default PODProductTemplate