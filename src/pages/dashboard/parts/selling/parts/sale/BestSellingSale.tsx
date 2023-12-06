import { VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function BestSellingSale() {
    return (
        <VStack align="stretch" spacing="6px">
            <AppTypography fontSize="14px">$1346.68</AppTypography>
            <AppTypography fontSize="10px">212 items</AppTypography>
        </VStack>
    )
}

export default BestSellingSale