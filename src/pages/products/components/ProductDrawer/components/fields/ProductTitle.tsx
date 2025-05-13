import AppInput from 'components/redesign/input/AppInput'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ImproveWithAi from '../common/ImproveWithAi'
import { useImproveAI } from 'pages/products/hooks/useImproveAI'

function ProductTitle() {
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()
    const improveAI = useImproveAI({ type: 'title' });
    const { isImproveLoading } = improveAI

    const label = product_type === "EVENT" ? 'Event Name' : 'Product Name'

    return (
        <AppInput
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
                <ImproveWithAi
                    isDisabled={!title}
                    {...improveAI}
                />
            }
            message={errors.title}
            maxCharacters={100}
            {...errors.title && { state: "error" }}
            {...isImproveLoading && { showAnimatedLoading: true }}
        />
    )
}

export default ProductTitle