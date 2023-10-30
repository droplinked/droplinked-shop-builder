import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import casper from "assest/icon/casper.svg";
import AppTypography from 'components/common/typography/AppTypography';

function OrderChain() {

  return (
    <HStack spacing={4}>
      <Box><AppTypography size="12px">Payment with</AppTypography></Box>
      <HStack gap="0">
        <Box><Image src={casper} width="14px" height="14px" /></Box>
        <Box><AppTypography size="12px" color={"#FF473E"}>Casper payment</AppTypography></Box>
      </HStack>
    </HStack>
  )
}

export default OrderChain