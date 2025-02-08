import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import ImproveTitle from './ImproveTitle'

function ProductTitle() {
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()
    const { aiGenerationData: { isTitleLoading } } = useProductPageStore()

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
                onChange: (e) => setFieldValue("title", e.target.value),
            }}
            inputContainerProps={{
                padding: "8px 8px 8px 16px",
            }}
            rightElement={
                <ImproveTitle />
            }
            message={errors.title}
            maxCharacters={100}
            {...errors.title && { state: "error" }}
            {...isTitleLoading && { showAnimatedLoading: true }}
        />
    )
}

export default ProductTitle