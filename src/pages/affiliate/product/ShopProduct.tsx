import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppCard from 'components/shared/card/AppCard'
import React from 'react'
import DetailsProduct from './parts/details/DetailsProduct'
import RequestProduct from './parts/requests/RequestProduct'
import SliderProduct from './parts/slider/SliderProduct'

function ShopProduct() {
  return (
    <AppCard>
      <VStack align={"stretch"} spacing={20}>
        <Flex gap={14}>
          <Box width={"45%"}><SliderProduct /></Box>
          <Box width={"55%"}><DetailsProduct /></Box>
        </Flex>
        <Box><RequestProduct /></Box>
        <Box><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{faker.lorem.paragraphs(20)}</Text></Box>
      </VStack>
    </AppCard>
  )
}

export default ShopProduct