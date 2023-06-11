import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import Properties from '../modules/properties/Properties'
import VariantsProduct from '../modules/variants/VariantsProduct'

function Variant() {
  const { state: { product_type, pod_blank_product_id } } = useContext(productContext)

  return (
    <>
      {(product_type === "PRINT_ON_DEMAND" && pod_blank_product_id) || ["DIGITAL", "NORMAL"].includes(product_type) ? (
        <ProductCollapse title='Variants' description="Create product properties to use in product variations.">
          <VStack align={"stretch"} spacing={10}>
            <Properties />
            <VariantsProduct />
          </VStack>
        </ProductCollapse>
      ) : null}
    </>
  )
}

export default Variant