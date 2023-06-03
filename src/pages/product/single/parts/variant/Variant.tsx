import { VStack } from '@chakra-ui/react'
import React from 'react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import Properties from '../modules/properties/Properties'
import VariantsProduct from '../modules/variants/VariantsProduct'

function Variant() {
  return (
    <ProductCollapse title='Variants' description="Select the product variation of your choice to include it in your store's inventory.">
      <VStack align={"stretch"} spacing={10}>
        <Properties />
        <VariantsProduct />
      </VStack>
    </ProductCollapse>
  )
}

export default Variant