import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps {
    product: any
}
function BestSellingProduct({ product }: IProps) {
    return (
        <Flex alignItems="center" gap="16px">
            <Image src={product?.productMedia?.find(el => el.isMain === "true")?.thumbnail} width="48px" height="48px" borderRadius="4px" />
            <VStack align="stretch">
                <AppTypography fontSize="14px" fontWeight="600">{product?.productName}</AppTypography>
                <Flex alignItems="center" gap="6px">
                    <Box backgroundColor="rgba(43, 207, 161, 0.25)" borderRadius="100px" padding="3px 8px"><AppTypography color="#2BCFA1">${product?.totalAmountDirect.toFixed(2)}</AppTypography></Box>
                    <Box backgroundColor="rgba(156, 78, 255, 0.25)" borderRadius="100px" padding="3px 8px"><AppTypography color="#C59CFF">${product?.totalAmountAffiliate.toFixed(2)}</AppTypography></Box>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default BestSellingProduct