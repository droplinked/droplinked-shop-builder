import { Box, HStack, VStack, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import orderModalContext from 'components/modals/order-modal/context'
import React, { useContext } from 'react'
import OrderModalProduct from './parts/product/OrderModalProduct';

function OrderDetailTable() {
    const { order } = useContext(orderModalContext)

    return (
        <VStack align="stretch" color="#C2C2C2">
            <Box marginBottom={2}>
                <AppTypography size="16px" weight="bolder" color="#FFF">Items</AppTypography>
            </Box>
            {order?.products ? order.products.map((el, key) => (
                <HStack alignItems="self-start" key={key} justifyContent="space-between">
                    <Box width="50%"><OrderModalProduct product={el} /></Box>
                    <Box width="15%"><AppTypography size='12px'>x{el?.quantity}</AppTypography></Box>
                    <VStack justifyContent="right" align="stretch">
                        <Box textAlign="right"><AppTypography size='12px'>${parseFloat(el?.amount).toFixed(2)}</AppTypography></Box>
                        <Flex alignItems="center" justifyContent="right" gap="4px">
                            {el?.discount && el?.hasRule ? <AppIcons.DiscountIcon width="10px" height="10px" /> : <AppIcons.GatedIcon width="10px" height="10px" />}
                            <AppTypography size='12px' color="#808080">{!el?.discount ? "Gated Product" : `$ ${el?.discount} Discount`}</AppTypography>
                        </Flex>
                    </VStack>
                </HStack>
            )) : null}
        </VStack>
    )
}

export default OrderDetailTable