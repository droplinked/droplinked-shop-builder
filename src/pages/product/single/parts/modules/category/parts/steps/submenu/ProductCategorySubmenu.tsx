import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import ProductCategoryNamespace from '../../../context'
import CategoryBox from '../../box/CategoryBox'

function ProductCategorySubmenu() {
  const { updateState } = useContext(ProductCategoryNamespace.context)

  const data = [
    {
      caption: "Men Clothing",
      value: "men"
    },
    {
      caption: "Men Clothing",
      value: "men"
    },
    {
      caption: "Men Clothing",
      value: "men"
    },
    {
      caption: "Men Clothing",
      value: "men"
    },
    {
      caption: "Men Clothing",
      value: "men"
    },
    {
      caption: "Men Clothing",
      value: "men"
    },
  ]

  return (
    <SimpleGrid columns={3} spacing="30px">
      {data.map((el, key) => (
        <CategoryBox padding="20px" onClick={() => updateState('menu', el.value)}>
          <Flex key={key} alignItems="center" gap="20px">
            <Box><AppTypography size='14px'>{el.caption}</AppTypography></Box>
          </Flex>
        </CategoryBox>
      ))}
    </SimpleGrid>
  )
}

export default ProductCategorySubmenu