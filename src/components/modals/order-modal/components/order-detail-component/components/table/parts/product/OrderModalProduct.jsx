import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'

function OrderModalProduct({ product }) {
  return (
    <HStack>
      <Box><Image width={"80px"} borderRadius={"7px"} src={product.media.length ? product.media[0].url : ""} /></Box>
      <Box><Text fontSize={"md"}>{product.title}</Text></Box>
    </HStack>
  )
}

export default OrderModalProduct