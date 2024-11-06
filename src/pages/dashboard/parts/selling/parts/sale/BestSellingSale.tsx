import { VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';
import React from 'react'

interface IProps {
    product: any
}
function BestSellingSale({ product }: IProps) {
    const { shop: { currency } } = useAppStore();

    return (
        <VStack align="stretch" spacing="6px">
            <AppTypography fontSize="14px">{currency.symbol}{currencyConvertion(product?.totalAmountCombined, currency.conversionRateToUSD, false)}  {currency.abbreviation}</AppTypography>
            <AppTypography fontSize="10px">{product?.totalCount} items</AppTypography>
        </VStack>
    )
}

export default BestSellingSale