import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useContext } from 'react'
import productCategoryContext from '../../../context'
import CategoryBox from '../../box/CategoryBox'
import ProductCategoryMenuModel from './model'

function ProductCategoryMenu() {
  const { dispatch, state: { category: { loading, cached } } } = useContext(productCategoryContext)

  const updateCategory = useCallback((value: any) => dispatch({ type: "updateCategory", params: { cached: [...cached, value] } }), [cached])

  return (
    <>
      {loading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : (
        <SimpleGrid columns={3} spacing="20px">
          {cached.length && cached[cached.length - 1].map((el, key) => (
            <CategoryBox key={key} padding="18px 22px" onClick={() => {
              if (el?.sub_categories && el?.sub_categories.length) updateCategory(el?.sub_categories)
              else dispatch({ type: "updateCategory", params: { id: el.id } })
            }}>
              <Flex alignItems="center" gap="20px">
                {!el.parent_id && <Box><AppImage src={ProductCategoryMenuModel.getIcon[el?.id] || el?.image_url} alt={el?.title} borderRadius="8px" width="53px" height="53" /></Box>}
                <Box><AppTypography size='14px'>{el?.title}</AppTypography></Box>
              </Flex>
            </CategoryBox>
          ))}
        </SimpleGrid>
      )
      }
    </>
  )
}

export default ProductCategoryMenu