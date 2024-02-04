import { Box } from '@chakra-ui/react'
import AppLimitCharacter from 'components/common/form/limitCharacter/AppLimitCharacter'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function ProductName() {
    const { state: { title }, methods: { updateState }, loading } = useContext(productContext)
    const limitCharacter = 70

    return (
        <Box position={"relative"}>
            <AppLimitCharacter limit={limitCharacter} value={title} />
            <AppInput
                label="Product Name"
                name="productName"
                isRequired
                loading={loading}
                paddingRight="80px"
                placeholder="Long Sleeve T-shirt"
                maxLength={limitCharacter}
                value={title}
                onChange={(e) => updateState("title", e.target.value)}
            />
        </Box>
    )
}

export default ProductName