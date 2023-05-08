import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import AppCard from 'components/shared/card/AppCard'
import { IproductService } from 'lib/apis/shop/interfaces'
import { productService } from 'lib/apis/shop/shopServices'
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
  const params = useParams()
  const product = data?.data?.data || null

  useEffect(() => {
    mutate({ productID: params.productID })
  }, [params.productID])

  return (
    <>
      {isLoading ? <ShopProductSkeleton /> : product ? (
        <ShopProductContext.Provider value={{ product }}>
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