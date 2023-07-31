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
  const { state: { sku, properties, product_type }, methods: { updateState }, loading, productID, store: { state: { variants } } } = useContext(productContext)
  const { makeData } = VariantsProductModel

  const addSku = useCallback(({ properties }: IaddSku) => {
    const makedata = makeData({
      properties: properties.filter(el => el.title.length && el.items.length),
      skues: sku,
      product_type
    })
    updateState("sku", makedata)
  }, [sku, variants, product_type])

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