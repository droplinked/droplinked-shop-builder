import { Box, Checkbox, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPovProvider from './parts/pov/ProductPovProvider'

function ProductTypes() {
    const { state: { product_type }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <VStack align={"stretch"} spacing={7}>
            <Box>
                <AppSkeleton isLoaded={loading} width={"70%"}>
                    <Checkbox size='md' isChecked={product_type === "PRINT_ON_DEMAND"} alignItems="flex-start" colorScheme='green' onChange={() => updateState("product_type", product_type === "PRINT_ON_DEMAND" ? "NORMAL" : "PRINT_ON_DEMAND")}>
                        <VStack align='stretch' paddingLeft={2} spacing={1}>
                            <AppTypography size='14px' weight='bolder'>Print On Demand</AppTypography>
                            <AppTypography size="14px" color="lightGray">
                                Transform your artwork or NFT into exclusive custom apparel, printed and shipped
                                by our trusted providers <a href='' style={{ color: "#2EC99E" }} target={"_blank"}>Learn more</a>
                            </AppTypography>
                        </VStack>
                    </Checkbox>
                </AppSkeleton>
            </Box>
            {product_type === "PRINT_ON_DEMAND" && <Box><ProductPovProvider /></Box>}
            <Box>
                <AppSkeleton isLoaded={loading}>
                    <Checkbox size='md' isChecked={product_type === "DIGITAL"} alignItems="flex-start" colorScheme='green' onChange={() => updateState("product_type", product_type === "DIGITAL" ? "NORMAL" : "DIGITAL")}>
                        <VStack align='stretch' paddingLeft={2} spacing={1}>
                            <AppTypography size='14px' weight='bolder'>Digital Product</AppTypography>
                            <AppTypography size="14px" color="lightGray">
                                Sell digital product. <a href='' style={{ color: "#2EC99E" }} target={"_blank"}>Learn more</a>
                            </AppTypography>
                        </VStack>
                    </Checkbox>
                </AppSkeleton>
            </Box>
        </VStack>
    )
}

export default ProductTypes