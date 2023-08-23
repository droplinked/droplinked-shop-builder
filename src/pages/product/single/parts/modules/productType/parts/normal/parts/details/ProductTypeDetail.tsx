import { Box, Flex, VStack } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useMemo } from 'react'

function ProductTypeDetail() {
    const { state: { pod_blank_product_id }, store: { state: { product_types } } } = useContext(productContext)

    const getDetail = useMemo(() => {
        if (product_types.length) return product_types.find(el => el._id === pod_blank_product_id)
        return null
    }, [pod_blank_product_id, product_types])

    return (
        <>
            {getDetail && (
                <Flex gap={3} padding="20px" borderRadius="8px" backgroundColor="#171717">
                    <Box width="fit-content">
                        <AppImage width="80px" height="100px" src={getDetail?.image} />
                    </Box>
                    <VStack width="100%" align="stretch" color="#777">
                        <AppTypography size='14px'>{getDetail?.description}</AppTypography>
                        <AppTypography size='14px'>{getDetail?.fabric_comp}</AppTypography>
                    </VStack>
                </Flex>
            )}
        </>
    )
}

export default ProductTypeDetail