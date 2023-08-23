import { Box, HStack, VStack } from '@chakra-ui/react';
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
                    <Box><AppTypography size='12px'>${pricePerItem(el)}</AppTypography></Box>
                </HStack>
            )) : null}
        </VStack>
    )
}

export default OrderDetailTable