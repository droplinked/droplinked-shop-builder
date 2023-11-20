import { Box, Flex, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useEffect } from 'react'
import CategoryBox from '../../box/CategoryBox'
import { productContext } from 'pages/product/single/context'
import ProductTypeModel from '../../../../productType/model'
import { useMutation } from 'react-query';
import { podCategoryProductService} from 'lib/apis/pod/services';
import { IpodCategoryProductService } from 'lib/apis/pod/interfaces';
import { productCategoryContext } from '../../../context';
import LoadingComponent from 'components/common/loading-component/LoadingComponent';

function ProductCategoryProduct() {
  const product = useContext(productContext)
  const { state: { category: { id } }, dispatch } = useContext(productCategoryContext)
  const { mutate, data, isLoading } = useMutation((params: IpodCategoryProductService) => podCategoryProductService(params))

  useEffect(() => mutate({ subCategoryId: id }), [id])

  return (
    <>
      {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : data?.data?.data?.data.length ?
        (
          <SimpleGrid columns={5} spacing="13px">
            {data && data?.data?.data?.data.map((el, key) => (
              <CategoryBox key={key} padding="10px" onClick={async () => {
                ProductTypeModel.updateProductType({ value: el.id.toString(), updateState: product.methods.updateState })
                dispatch({
                  type: "updateProduct", params: {
                    image: el?.image,
                    title: el?.title
                  }
                })
              }}>
                <VStack align="stretch" spacing="12px">
                  <Flex justifyContent="center"><Image src={el?.image} alt={el?.title} borderRadius="5px" width="100%" /></Flex>
                  <Box><AppTypography fontSize='14px'>{el?.title}</AppTypography></Box>
                  <Box><AppTypography fontSize='14px'>{'---'}</AppTypography></Box>
                </VStack>
              </CategoryBox>
            ))}
          </SimpleGrid>
        )
        :
        (
          <Flex justifyContent="center">
            <AppTypography fontSize='16px' color="#777">Empty</AppTypography>
          </Flex>
        )
      }
    </>
  )
}

export default ProductCategoryProduct