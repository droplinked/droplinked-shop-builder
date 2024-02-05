import { VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps {
    product: any
}
function BestSellingSale({ product }: IProps) {

    return (
        <VStack align="stretch" spacing="6px">
            <AppTypography fontSize="14px">${product?.totalAmountCombined.toFixed(2)} USD</AppTypography>
            <AppTypography fontSize="10px">{product?.totalCount} items</AppTypography>
        </VStack>
    )
}

export default BestSellingSale