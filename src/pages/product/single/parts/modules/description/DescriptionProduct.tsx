import { Box } from '@chakra-ui/react'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <Box position={"relative"}>
            <AppTextarea
                label="Description"
                isRequired
                name="description"
                minHeight={200}
                placeholder="Stylish, and Comfortable Long Sleeve T-Shirt..."
                loading={loading}
                value={description}
                onChange={(e) => updateState("description", e.target.value)}
            />
        </Box>
    )
}

export default DescriptionProduct