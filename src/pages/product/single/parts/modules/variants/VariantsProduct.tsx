import { Box, VStack } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect } from 'react'
import SkuTable from './parts/table/SkuTable'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from '../title/ProductPageTitle'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { Iproperties } from "lib/apis/product/interfaces";
import VariantsProductModel from './model/model'

interface IaddSku {
  properties: Array<Iproperties>
}

function VariantsProduct() {
  const { state, methods: { updateState }, loading, productID, store: { state: { available_variant, variants } } } = useContext(productContext)
  const { sku, properties, product_type } = state
  const { makeData } = VariantsProductModel

  const addSku = useCallback(() => {
    const makedata = makeData({
      properties: properties.filter(el => el.title.length && el.items.length),
      available_variant,
      state
    })
    updateState("sku", makedata)
  }, [sku, variants, product_type, product_type, properties, available_variant])

  useEffect(() => {
    addSku()
  }, [properties, productID, product_type, available_variant])

  return (
    <AppSkeleton isLoaded={loading}>
      <VStack width={"100%"} spacing={4} align={"stretch"}>
        <Box>
          <ProductPageTitle
            head
            isRequired
            title='Product Variants'
            description=''
          />
        </Box>
        {sku.length && <Box><SkuTable /></Box>}
      </VStack>
    </AppSkeleton>
  )
}

export default VariantsProduct