import { VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React from 'react'
import Properties from '../modules/properties/Properties'
import ProductPageTitle from '../modules/title/ProductPageTitle'
import VariantsProduct from '../modules/variants/VariantsProduct'

function Variant() {
  return (
    <AppCard mini>
      <VStack align={"stretch"} spacing={10}>
        <ProductPageTitle
          head
          isReuired
          title='Variants'
          description='Add product properties (price, quantity, external ID and package size are already provided)'
        />
        <Properties />
        <VariantsProduct />
      </VStack>
    </AppCard>
  )
}

export default Variant