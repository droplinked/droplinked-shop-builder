import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function OrderModalProduct({ product }) {
  return (
    <HStack>
      <Box><Image width={"50px"} borderRadius={"7px"} src={product.media.length ? product.media[0].url : ""} /></Box>
      <VStack align="stretch">
        <Box><AppTypography size='12px'>{product.title}</AppTypography></Box>
        <Box><AppTypography size='12px' color="#808080">{product?.shippingType}</AppTypography></Box>
      </VStack>
    </HStack>
  )
}

export default OrderModalProduct