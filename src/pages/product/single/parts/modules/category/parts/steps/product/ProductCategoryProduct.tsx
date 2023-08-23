import { Box, Flex, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import CategoryBox from '../../box/CategoryBox'
import { faker } from '@faker-js/faker';
import { productContext } from 'pages/product/single/context'
import ProductTypeModel from '../../../../productType/model'

function ProductCategoryProduct() {
  const { methods: { updateState } } = useContext(productContext)

  const data = [
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
    {
      caption: "Men Clothing",
      icon: faker.image.image(),
      price: "34.4 USD",
      value: "64d9e5449e763fa7b150342e"
    },
  ]

  return (
    <SimpleGrid columns={5} spacing="13px">
      {data.map((el, key) => (
        <CategoryBox padding="10px" onClick={() => ProductTypeModel.updateProductType({ value: el.value, updateState })}>
          <VStack key={key} align="stretch" spacing="12px">
            <Flex justifyContent="center"><Image src={el.icon} alt={el.caption} borderRadius="5px" width="100%" /></Flex>
            <Box><AppTypography size='14px'>{el.caption}</AppTypography></Box>
            <Box><AppTypography size='14px'>{el.price}</AppTypography></Box>
          </VStack>
        </CategoryBox>
      ))}
    </SimpleGrid>
  )
}

export default ProductCategoryProduct