import { Box, VStack } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect } from 'react'
import SkuTable from './parts/table/SkuTable'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from '../title/ProductPageTitle'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { Iproperties, Isku } from "lib/apis/product/interfaces";
import VariantsProductModel from './model'

interface IaddSku {
  properties: Array<Iproperties>
}

function VariantsProduct() {
  const { state: { sku, properties, product_type }, methods: { updateState }, loading, productID, store: { state: { variants } } } = useContext(productContext)
  const { refactor } = VariantsProductModel

  const addSku = useCallback(({ properties }: IaddSku) => {
    properties = properties.filter(el => el.items.length).map(el => ({
      ...el,
      items: el.items.filter(item => item.value)
    }))

    updateState("sku", refactor({ properties, skues: sku, variants, product_type }))
  }, [sku, variants, product_type,])

  useEffect(() => {
    addSku({ properties })
  }, [properties, productID, product_type])

  return (
    <AppSkeleton isLoaded={loading}>
      <VStack width={"100%"} spacing={4} align={"stretch"}>
        <Box>
          <ProductPageTitle
            head
            isReuired
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