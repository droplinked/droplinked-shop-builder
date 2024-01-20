import { Box, Flex, VStack } from '@chakra-ui/layout'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import { productCategoryervices } from 'lib/apis/product/productServices'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'

function ProductCategories() {
  const { state: { mainCategory, subCategories }, methods: { updateState } } = useContext(productContext)
  const { data, isLoading } = useQuery({
    queryFn: productCategoryervices,
    queryKey: "product_category",
    cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  return (
    <VStack align="stretch" spacing="30px">
      <VStack align="stretch">
        <FieldLabel label='Category' />
        <AppSelectBox
          items={data?.data?.data ? data?.data?.data.map(el => ({
            caption: el.title,
            value: el._id
          })) : []}
          placeholder="---"
          onChange={(e) => {
            updateState('mainCategory', e.target.value)
            updateState('subCategories', [])
          }}
          value={mainCategory}
          loading={!isLoading}
          name="Category"
        />
      </VStack>
      {mainCategory && (
        <VStack align="stretch">
          <FieldLabel label='Sub category' />
          <Flex flexWrap="wrap" gap="10px">
            {data?.data?.data.find(el => el._id === mainCategory)?.subCategories.map((el, key) => (
              <Box key={key} cursor="pointer" padding="10px 20px" onClick={() => updateState('subCategories', subCategories.includes(el._id) ? subCategories.filter(item => item !== el._id) : [...subCategories, el._id])} border={`2px solid ${subCategories.includes(el._id) ? "#2EC99E" : "#2F2F2F"}`} borderRadius="8px"><AppTypography fontSize="14px">{el.title}</AppTypography></Box>
            ))}
          </Flex>
        </VStack>
      )}
    </VStack>
  )
}

export default ProductCategories