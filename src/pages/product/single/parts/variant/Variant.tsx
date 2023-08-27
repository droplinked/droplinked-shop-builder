import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductModel from '../../model'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductType from '../modules/productType/ProductType'
import Properties from '../modules/properties/Properties'
import VariantsProduct from '../modules/variants/VariantsProduct'

function Variant() {
  const { state: { product_type, pod_blank_product_id, prodviderID } } = useContext(productContext)

  return (
    <>
      {(product_type === "PRINT_ON_DEMAND" && pod_blank_product_id) || ["DIGITAL", "NORMAL"].includes(product_type) ? (
        <ProductCollapse title='Variants' description="Set product type and define product properties for use in product variations.">
          <VStack align={"stretch"} spacing={10}>
            {!ProductModel.isPrintful(prodviderID) && product_type === "PRINT_ON_DEMAND" && <ProductType />}
            <Properties />
            <VariantsProduct />
          </VStack>
        </ProductCollapse >
      ) : null
      }
    </>
  )
}

export default Variant