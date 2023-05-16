import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import AppCard from 'components/shared/card/AppCard'
import { IproductService, IrecordedShopService } from 'lib/apis/shop/interfaces'
import { productService, recordedShopService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { ShopProductContext } from './context'
import DetailsProduct from './parts/details/DetailsProduct'
import RequestProduct from './parts/requests/RequestProduct'
import ShopProductSkeleton from './parts/skeleton/ShopProductSkeleton'
import SliderProduct from './parts/slider/SliderProduct'

function ShopProduct() {
  const { mutate, data, isLoading } = useMutation((params: IproductService) => productService(params))
  const shopService = useMutation((params: IrecordedShopService) => recordedShopService(params))
  const params = useParams()
  const product = data?.data?.data || null
  const shop = shopService.data?.data?.data ? shopService.data?.data?.data[0] : null

  // Get product
  useEffect(() => mutate({ productID: params.productID, shopname: params.shopName }), [params.productID, params.shopName])

  // Get shop
  useEffect(() => shopService.mutate({ shopName: params.shopName }), [params.shopName])

  return (
    <>
      {isLoading ? <ShopProductSkeleton /> : product ? (
        <ShopProductContext.Provider value={{ product, shop }}>
          <AppCard>
            <VStack align={"stretch"} spacing={20}>
              <Flex gap={14}>
                <Box width={"45%"}><SliderProduct /></Box>
                <Box width={"55%"}><DetailsProduct /></Box>
              </Flex>
              <Box><RequestProduct /></Box>
              <Box><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{product?.description}</Text></Box>
            </VStack>
          </AppCard>
        </ShopProductContext.Provider>
      ) : ""}
    </>
  )
}

export default ShopProduct