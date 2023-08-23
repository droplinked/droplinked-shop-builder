import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import { IpodProductService } from 'lib/apis/pod/interfaces'
import { podProductService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import ProductTypeModel from '../productType/model'
import ProductTypeDetail from '../productType/parts/normal/parts/details/ProductTypeDetail'
import ProductCategoryNamespace, { IProductCategoryState } from './context'
import ProductCategoryDetail from './parts/details/ProductCategoryDetail'
import ProductCategoryMenu from './parts/steps/menu/ProductCategoryMenu'
import ProductCategoryProduct from './parts/steps/product/ProductCategoryProduct'
import ProductCategorySubmenu from './parts/steps/submenu/ProductCategorySubmenu'

function ProductCategory() {
  const { context, state } = ProductCategoryNamespace
  const [States, setStates] = useState<IProductCategoryState>(state)
  const { state: { pod_blank_product_id, publish_product }, methods, productID } = useContext(productContext)
  const { mutate, data, isLoading } = useMutation((params: IpodProductService) => podProductService(params))

  const updateState = useCallback((key: string, value: string) => setStates(prev => ({ ...prev, [key]: value })), [])

  const steps = useMemo(() => {
    if (States.menu && !States.submenu) return <ProductCategorySubmenu />
    else if (States.submenu) return <ProductCategoryProduct />
    else return <ProductCategoryMenu />
  }, [States])

  const reset = useCallback(() => {
    ProductTypeModel.updateProductType({ value: null, updateState: methods.updateState })
    setStates(state)
  }, [States, pod_blank_product_id])

  useEffect(() => {
    if (pod_blank_product_id && productID) mutate({ pod_blank_product_id }, {
      onSuccess: (res) => {
        const data = res?.data?.data
        if (data) {
          updateState('title', data?.title)
          updateState('image', data?.image)
        }
      }
    })
  }, [pod_blank_product_id, productID])

  const backCheck = useMemo(() => (States.menu || States.submenu) && !pod_blank_product_id, [States, pod_blank_product_id])

  return (
    <context.Provider value={{ state: States, updateState }}>
      <VStack align="stretch" spacing="12px">
        <Flex justifyContent="space-between" alignItems="center">
          <VStack align="stretch" spacing="12px">
            <FieldLabel label={pod_blank_product_id ? "Product Type" : "Product Category"} isRequired />
            <AppTypography color="#C2C2C2" size='14px'>Product Category</AppTypography>
          </VStack>
          {pod_blank_product_id || States.menu || States.submenu ? <BasicButton
            onClick={() => {
              if (backCheck) {
                if (States.menu && !States.submenu) updateState('menu', null)
                else if (States.submenu) updateState('submenu', null)
              } else reset()
            }}
            variant='outline'
            sizes="medium"
            isDisabled={Boolean(productID) && publish_product}
          >
            {backCheck ? "Back" : "Reset Product"}
          </BasicButton> : null}
        </Flex>
        {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : (
          <Box color="#C2C2C2">{pod_blank_product_id ? <ProductTypeDetail image={States.image} title={States.title} boxes={["title"]} /> : steps}</Box>
        )}
      </VStack>
    </context.Provider>
  )
}

export default ProductCategory