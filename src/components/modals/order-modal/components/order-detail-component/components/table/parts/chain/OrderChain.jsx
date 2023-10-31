import { Box, HStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AppTypography from 'components/common/typography/AppTypography';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import orderModalContext from 'components/modals/order-modal/context';

function OrderChain() {
  const { order } = useContext(orderModalContext)

  return order?.details?.chain ? (
    <HStack spacing={4}>
      <Box><AppTypography size="12px">Payment with</AppTypography></Box>
      <HStack gap="0">
        <Box><IconBlockchain blockchain={order?.details?.chain} /></Box>
        <Box><AppTypography size="12px" color={"#FF473E"}>{order?.details?.chain} payment</AppTypography></Box>
      </HStack>
    </HStack>
  ) : null
}

export default OrderChain