import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function OrderModalProduct({ data }) {
  const product = data.product
  console.log(data.color);
  return (
    <HStack>
      <Box><Image width={"50px"} borderRadius={"7px"} src={product.media.length ? product.media[0].url : ""} /></Box>
      <VStack align="stretch">
        <Box><AppTypography size='12px'>{product.title}: {data.size}</AppTypography></Box>
        <Box width="18px" height="18px" borderRadius="100%" backgroundColor={data.color} border="1px solid #333"></Box>
        <Box><AppTypography size='12px' color="#808080">{product?.shippingType}</AppTypography></Box>
      </VStack>
    </HStack>
  )
}

export default OrderModalProduct