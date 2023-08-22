import { Box, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useMemo, useState } from 'react'
import ProductCategoryNamespace, { IProductCategoryState } from './context'
import ProductCategoryMenu from './parts/steps/menu/ProductCategoryMenu'
import ProductCategoryProduct from './parts/steps/product/ProductCategoryProduct'
import ProductCategorySubmenu from './parts/steps/submenu/ProductCategorySubmenu'

function ProductCategory() {
  const { context, state } = ProductCategoryNamespace
  const [States, setStates] = useState<IProductCategoryState>(state)

  const updateState = useCallback((key: string, value: string) => setStates(prev => ({ ...prev, [key]: value })), [])

  const steps = useMemo(() => {
    if (States.menu) return <ProductCategorySubmenu />
    else if (States.submenu) return <ProductCategoryProduct />
    else return <ProductCategoryMenu />
  }, [States])

  return (
    <context.Provider value={{ state: States, updateState }}>
      <VStack align="stretch" spacing="14px">
        <FieldLabel label='Product Category' isRequired />
        <AppTypography color="#C2C2C2" size='14px'>Product Category</AppTypography>
        <Box color="#C2C2C2">{steps}</Box>
      </VStack>
    </context.Provider>
  )
}

export default ProductCategory