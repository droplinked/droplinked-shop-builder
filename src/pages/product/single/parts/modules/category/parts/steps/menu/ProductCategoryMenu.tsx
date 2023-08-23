import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import ProductCategoryNamespace from '../../../context'
import CategoryBox from '../../box/CategoryBox'

function ProductCategoryMenu() {
  const { updateState } = useContext(ProductCategoryNamespace.context)

  const data = [
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
    {
      caption: "Men Clothing",
      icon: "/assets/images/category/menClothing.svg",
      value: "men"
    },
  ]

  return (
    <SimpleGrid columns={3} spacing="30px">
      {data.map((el, key) => (
        <CategoryBox onClick={() => updateState('menu', el.value)}>
          <Flex key={key} alignItems="center" gap="20px">
            <Box><img src={el.icon} alt={el.caption} width="43px" height="43" /></Box>
            <Box><AppTypography size='14px'>{el.caption}</AppTypography></Box>
          </Flex>
        </CategoryBox>
      ))}
    </SimpleGrid>
  )
}

export default ProductCategoryMenu