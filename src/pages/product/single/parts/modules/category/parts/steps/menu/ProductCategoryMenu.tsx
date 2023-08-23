import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import { podCategoryService } from 'lib/apis/pod/services'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import ProductCategoryNamespace from '../../../context'
import CategoryBox from '../../box/CategoryBox'

function ProductCategoryMenu() {
  const { updateState } = useContext(ProductCategoryNamespace.context)
  const { mutate, data, isLoading } = useMutation((params: any) => podCategoryService(params))

  useEffect(() => {
    mutate({})
  }, [])

  return (
    <>
      {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : (
        <SimpleGrid columns={3} spacing="20px">
          {data && data?.data?.data && data?.data?.data?.data.map((el, key) => (
            <CategoryBox key={key} padding="18px 22px" onClick={() => updateState('menu', el.id)}>
              <Flex alignItems="center" gap="20px">
                <Box><AppImage src={el?.image_url} alt={el?.title} borderRadius="8px" width="43px" height="43" /></Box>
                <Box><AppTypography size='14px'>{el?.title}</AppTypography></Box>
              </Flex>
            </CategoryBox>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}

export default ProductCategoryMenu