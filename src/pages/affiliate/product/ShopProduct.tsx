import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import { IproductByIdServices } from 'lib/apis/product/interfaces'
import { productByIdServices } from 'lib/apis/product/productServices'
import { IrecordedShopService } from 'lib/apis/shop/interfaces'
import { recordedShopService } from 'lib/apis/shop/shopServices'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { ShopProductContext } from './context'
import DetailsProduct from './parts/details/DetailsProduct'
import RequestProduct from './parts/requests/RequestProduct'
import ShopProductSkeleton from './parts/skeleton/ShopProductSkeleton'
import SliderProduct from './parts/slider/SliderProduct'

function ShopProduct() {
  const { mutate, data, isLoading } = useMutation((params: IproductByIdServices) => productByIdServices(params))
  const shopService = useMutation((params: IrecordedShopService) => recordedShopService(params))
  const params = useParams()
  const product = data?.data?.data || null
  const shop = shopService.data?.data?.data ? shopService.data?.data?.data[0] : null
  const [States, setStates] = useState({
    slider: null
  },)

  const updateState = (key, value) => setStates(prev => ({ ...prev, [key]: value }))

  // Get product
  useEffect(() => mutate({ productID: params.productID, shopname: params.shopName }), [params.productID])

  // Get shop
  useEffect(() => shopService.mutate({ shopName: params.shopName }), [params.shopName])

  return (
    <>
      {isLoading ? <ShopProductSkeleton /> : product ? (
        <ShopProductContext.Provider value={{ product, shop, states: States, updateState }}>
          <AppCard>
            <VStack align={"stretch"} spacing={20}>
              <Flex gap={14}>
                <Box width={"45%"}><SliderProduct /></Box>
                <Box width={"55%"}><DetailsProduct /></Box>
              </Flex>
              <Box><RequestProduct /></Box>
              <Box><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg" dangerouslySetInnerHTML={{ __html: product?.description }}></Text></Box>
            </VStack>
          </AppCard>
        </ShopProductContext.Provider>
      ) : ""}
    </>
  )
}

export default ShopProduct