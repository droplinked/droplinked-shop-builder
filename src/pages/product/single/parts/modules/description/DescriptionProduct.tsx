import { Box, VStack } from '@chakra-ui/react'
import AppLimitCharacter from 'components/common/form/limitCharacter/AppLimitCharacter'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import AppTypography from 'components/common/typography/AppTypography'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)
    const limitCharacter = 250

    return (
        <Box position={"relative"}>
            <AppLimitCharacter limit={limitCharacter} value={description} />
            <AppTextarea
                label="Description"
                isRequired
                name="description"
                error={description.length > 250 && AppErrors.product.product_description_too_long}
                minHeight={200}
                maxLength={limitCharacter}
                placeholder="Stylish, and Comfortable Long Sleeve T-Shirt..."
                loading={loading}
                value={description}
                onChange={(e) => updateState("description", e.target.value)}
            />
        </Box>
    )
}

export default DescriptionProduct