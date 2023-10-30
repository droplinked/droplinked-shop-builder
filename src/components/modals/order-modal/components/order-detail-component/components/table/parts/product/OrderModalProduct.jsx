import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import ProductListModel from 'pages/product/list/model'
import React from 'react'

function OrderModalProduct({ product }) {
  const { getMain } = ProductListModel
  const main = getMain(product)

  return (
    <HStack alignItems="center" spacing="8px">
      <Box><Image width={"48px"} borderRadius={"7px"} src={main ? main : product.media.find(el => el.isMain === "true")} /></Box>
      <VStack align="stretch">
        <Box><AppTypography size='12px'>{product.title}: {product.size}</AppTypography></Box>
        <Box><AppTypography size='12px' color="#808080">{product?.shippingType}</AppTypography></Box>
      </VStack>
    </HStack>
  )
}

export default OrderModalProduct