import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import { IpodCategoryService } from 'lib/apis/pod/interfaces'
import { podCategoryService } from 'lib/apis/pod/services'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import ProductCategoryNamespace from '../../../context'
import CategoryBox from '../../box/CategoryBox'

function ProductCategorySubmenu() {
  const { updateState, state: { menu } } = useContext(ProductCategoryNamespace.context)
  const { mutate, data, isLoading } = useMutation((params: IpodCategoryService) => podCategoryService(params))

  useEffect(() => {
    mutate({ mainCategoryId: menu })
  }, [menu])

  return (
    <>
      {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex> : (
        <SimpleGrid columns={3} spacing="20px">
          {data && data?.data?.data?.data.map((el, key) => (
            <CategoryBox key={key} padding="20px" onClick={() => updateState('submenu', el.id)}>
              <Flex alignItems="center" gap="20px">
                <Box><AppTypography size='14px'>{el?.title}</AppTypography></Box>
              </Flex>
            </CategoryBox>
          ))}
        </SimpleGrid>
      )}
    </>
  )
}

export default ProductCategorySubmenu