import { Box, HStack, VStack, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import orderModalContext from 'components/modals/order-modal/context'
import React, { useContext } from 'react'
import OrderModalProduct from './parts/product/OrderModalProduct';

function OrderDetailTable() {
    const { order } = useContext(orderModalContext)

    const pricePerItem = (item) => parseFloat(item?.totalPriceItem / item?.quantity).toFixed(2)

    return (
        <VStack align="stretch" color="#C2C2C2">
            <Box marginBottom={2}>
                <AppTypography size="16px" weight="bolder">Items</AppTypography>
            </Box>
            {order.items ? order.items.map((el, key) => (
                <HStack key={key} justifyContent="space-between">
                    <Box width="50%"><OrderModalProduct data={el} /></Box>
                    <Box><AppTypography size='12px'>x{el?.quantity}</AppTypography></Box>
                    <VStack justifyContent="right" align="stretch">
                        <Box textAlign="right"><AppTypography size='12px'>${pricePerItem(el)}</AppTypography></Box>
                        <Flex alignItems="center" justifyContent="right" gap="4px">
                            {el?.passedRule ? <AppIcons.DiscountIcon width="10px" height="10px" /> : <AppIcons.GatedIcon width="10px" height="10px" />}
                            <AppTypography size='12px' color="#808080">{!el?.passedRule ? "Gated Product" : `$ ${el?.passedRule?.rules[0]?.discountPercentage} Discount`}</AppTypography>
                        </Flex>
                    </VStack>
                </HStack>
            )) : null}
        </VStack>
    )
}

export default OrderDetailTable