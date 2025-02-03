import { Box } from '@chakra-ui/react'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ImproveTitle from './ImproveTitle'

function ProductTitle() {
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()
    const label = product_type === "EVENT" ? 'Event Name' : 'Product Name'

    return (
        <Box>
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
                    <ImproveTitle
                        title={title}
                        onTitleChange={(newTitle) => setFieldValue("title", newTitle)}
                    />
                }
                message={errors.title}
                maxCharacters={100}
                {...errors.title && { state: "error" }}
            />
        </Box>
    )
}

export default ProductTitle