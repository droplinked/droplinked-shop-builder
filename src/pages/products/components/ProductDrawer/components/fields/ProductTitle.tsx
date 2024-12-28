import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'

function ProductTitle() {
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()

    const label = product_type === "EVENT" ? 'Event Name' : 'Product Name'

    return (
        <Input
            label={label}
            description='Enter a unique product name. This will be visible to customers.'
            inputProps={{
                placeholder: "e.g., Handmade Ceramic Mug",
                value: title,
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