import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import ProductTypeModel from '../productType/model'
import ProductCategoryNamespace, { IProductCategoryState } from './context'
import ProductCategoryDetail from './parts/details/ProductCategoryDetail'
import ProductCategoryMenu from './parts/steps/menu/ProductCategoryMenu'
import ProductCategoryProduct from './parts/steps/product/ProductCategoryProduct'
import ProductCategorySubmenu from './parts/steps/submenu/ProductCategorySubmenu'

function ProductCategory() {
  const { context, state } = ProductCategoryNamespace
  const [States, setStates] = useState<IProductCategoryState>(state)
  const { state: { pod_blank_product_id }, methods } = useContext(productContext)

  const updateState = useCallback((key: string, value: string) => setStates(prev => ({ ...prev, [key]: value })), [])

  const steps = useMemo(() => {
    if (States.menu && !States.submenu) return <ProductCategorySubmenu />
    else if (States.submenu) return <ProductCategoryProduct />
    else return <ProductCategoryMenu />
  }, [States])
  
  const reset = useCallback(() => {
    ProductTypeModel.updateProductType({ value: null, updateState: methods.updateState })
    setStates(state)
  }, [])

  return (
    <context.Provider value={{ state: States, updateState }}>
      <VStack align="stretch" spacing="12px">
        <Flex justifyContent="space-between" alignItems="center">
          <VStack align="stretch" spacing="12px">
            <FieldLabel label={pod_blank_product_id ? "Product Type" : "Product Category"} isRequired />
            <AppTypography color="#C2C2C2" size='14px'>Product Category</AppTypography>
          </VStack>
          {pod_blank_product_id && <BasicButton onClick={reset} variant='outline' sizes="medium">Reset Product</BasicButton>}
        </Flex>
        <Box color="#C2C2C2">{pod_blank_product_id ? <ProductCategoryDetail /> : steps}</Box>
      </VStack>
    </context.Provider>
  )
}

export default ProductCategory