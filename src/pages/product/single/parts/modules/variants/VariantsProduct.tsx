import { Box, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import AddVariants from './parts/add'
import SkuTable from './parts/table/SkuTable'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from '../title/ProductPageTitle'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'

function VariantsProduct() {
  const { state: { sku }, loading } = useContext(productContext)

  return (
    <AppSkeleton isLoaded={loading}>
      <VStack width={"100%"} spacing={4} align={"stretch"}>
        <Box>
          <ProductPageTitle
            title='Product Variants'
            description='Enter product price, quantity, external ID and package size'
          />
        </Box>
        {sku.length && <Box><SkuTable /></Box>}
        <Box><AddVariants /></Box>
      </VStack>
    </AppSkeleton>
  )
}

export default VariantsProduct