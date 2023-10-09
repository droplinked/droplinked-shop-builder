import { Box, Flex, VStack } from '@chakra-ui/layout'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'

function ProductCategories() {
  const [SubCategory, setSubCategory] = useState([])

  const subs = ["Men's", "Women's", "Children's", "Underwear"]

  return (
    <VStack align="stretch" spacing="30px">
      <VStack align="stretch">
        <FieldLabel label='Category' />
        <AppSelectBox
          items={[
            {
              caption: "Clothing",
              value: "Clothing"
            },
            {
              caption: "Shoes",
              value: "Shoes"
            },
            {
              caption: "Software",
              value: "Software"
            },
            {
              caption: "Digital assets",
              value: "Digital assets"
            },
          ]}
          name="Category"
        />
      </VStack>
      <VStack align="stretch">
        <FieldLabel label='Sub category' />
        <Flex flexWrap="wrap" gap="10px">
          {subs.map((el, key) => (
            <Box key={key} cursor="pointer" padding="10px 20px" onClick={() => setSubCategory(prev => SubCategory.includes(el) ? prev.filter(item => item !== el) : [...prev, el])} border={`2px solid ${SubCategory.includes(el) ? "#2EC99E" : "#2F2F2F"}`} borderRadius="8px"><AppTypography size="14px">{el}</AppTypography></Box>
          ))}
        </Flex>
      </VStack>
    </VStack>
  )
}

export default ProductCategories