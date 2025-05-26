import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { IDroplinkedNftsSkus } from 'services/onchain-inventory/interface'
import SkuVariants from 'pages/products/components/ProductDrawer/components/common/SkuVariants'
import React from 'react'

export default function SKURow({ item }: { item: IDroplinkedNftsSkus }) {
    const unlimitedQuantity = 1000000
    const { price, quantity, options } = item

    return (
        <Flex flexDirection="column" border="1px solid" borderColor="neutral.gray.800" borderRadius={8}>
            <Flex p={4} justifyContent="space-between" alignItems="center">
                <SkuVariants options={options} />
                {
                    quantity === unlimitedQuantity ?
                        <AppIcons.Infinity /> :
                        <AppTypography color="#fff" fontSize={14}>{quantity}</AppTypography>
                }
                <FormattedPrice price={price} />
            </Flex>
        </Flex>
    )
}