import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'

function ProductTitle() {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>()

    return (
        <Input
            label='Product Name'
            description='Enter a unique product name. This will be visible to customers.'
            inputProps={{
                placeholder: "e.g., Handmade Ceramic Mug",
                value: values.title,
                isRequired: true,
                fontSize: 16,
                onChange: (e) => setFieldValue("title", e.target.value)
            }}
            hasError={!!errors.title}
            message={errors.title}
            maxCharacters={100}
        />
    )
}

export default ProductTitle