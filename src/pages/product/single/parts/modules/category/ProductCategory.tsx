import { Box, Flex, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import { IpodProductService } from 'lib/apis/pod/interfaces'
import { podCategoryService, podProductService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import { useMutation } from 'react-query'
import ProductTypeDetail from '../productType/parts/normal/parts/details/ProductTypeDetail'
import productCategoryContext from './context'
import ProductCategoryButton from './parts/button/ProductCategoryButton'
import ProductCategoryMenu from './parts/steps/menu/ProductCategoryMenu'
import ProductCategoryProduct from './parts/steps/product/ProductCategoryProduct'
import ProductCategoryNamespace from './reducer'

function ProductCategory() {
  const { initialState, reducer } = ProductCategoryNamespace
  const [States, dispatch] = useReducer(reducer, initialState)
  const { state: { pod_blank_product_id }, methods, productID } = useContext(productContext)
  const { mutate, isLoading } = useMutation((params: IpodProductService) => podProductService(params))
  const Categories = useMutation((params: any) => podCategoryService(params))

  const steps = useMemo(() => States.category.id ? <ProductCategoryProduct /> : <ProductCategoryMenu />, [States.category.id])

  // Get Categories
  useEffect(() => {
    Categories.mutate({}, {
      onSuccess: res => {
        const data = res?.data?.data?.data
        dispatch({ type: "updateCategory", params: { loading: false, cached: [data] } })
      }
    })
  }, [])


  useEffect(() => {
    if (pod_blank_product_id || productID) mutate({ pod_blank_product_id }, {
      onSuccess: (res) => {
        const data = res?.data?.data
        if (data) {
          dispatch({
            type: "updateProduct",
            params: {
              title: data?.title,
              image: data?.image
            }
          })
          methods.dispatch({ type: "updateStore", params: { storeName: 'product_printful', value: data } })
        }
      }
    })
  }, [pod_blank_product_id, productID])

  return (
    <productCategoryContext.Provider value={{ state: States, dispatch }}>
      <VStack align="stretch" spacing="12px">
        <Flex justifyContent="space-between" alignItems="center">
          <VStack align="stretch" spacing="12px">
            <FieldLabel label={pod_blank_product_id ? "Product Type" : "Product Catalog"} isRequired />
          </VStack>
          <ProductCategoryButton />
        </Flex>
        {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : (
          <Box color="#C2C2C2">{pod_blank_product_id ? <ProductTypeDetail image={States.product.image} title={States.product.title} boxes={["title"]} /> : steps}</Box>
        )}
      </VStack>
    </productCategoryContext.Provider>
  )
}

export default ProductCategory