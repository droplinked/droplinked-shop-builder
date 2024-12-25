import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'

function ProductTitle() {
    const { values, errors, setFieldValue } = useProductForm()

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