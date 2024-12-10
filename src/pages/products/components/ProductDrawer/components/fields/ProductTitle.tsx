import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/formSchema'
import React from 'react'
import ProductFieldWrapper from '../common/ProductFieldWrapper'

function ProductTitle() {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>()

    return (
        <ProductFieldWrapper
            label='Product Name'
            description='Enter a unique product name. This will be visible to customers.'
            isRequired
        >
            <Input
                inputProps={{
                    value: values.title,
                    placeholder: "e.g., Handmade Ceramic Mug",
                    isRequired: true,
                    onChange: (e) => setFieldValue("title", e.target.value)
                }}
                error={errors.title}
            />
        </ProductFieldWrapper>
    )
}

export default ProductTitle