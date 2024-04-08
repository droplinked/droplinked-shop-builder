import { Flex, Image, SimpleGrid } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import AppTypography from 'components/common/typography/AppTypography'
import { IpodCategoryProductService } from 'lib/apis/pod/interfaces'
import { podCategoryProductService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import ProductTypeModel from '../../../../productType/model'
import { productCategoryContext } from '../../../context'
import CategoryBox from '../../box/CategoryBox'
import StarRating from './parts/starRating/StarRating'

function ProductCategoryProduct() {
  const product = useContext(productContext)
  const { state: { category: { id } }, dispatch } = useContext(productCategoryContext)
  const { mutate, data, isLoading } = useMutation((params: IpodCategoryProductService) => podCategoryProductService(params))

  useEffect(() => mutate({ subCategoryId: id }), [id])

  return (
    <>
      {isLoading ? <Flex justifyContent="center"><LoadingComponent /></Flex > : data?.data?.data?.data.length ?
        (
          <SimpleGrid columns={5} spacing="12px">
            {data && data?.data?.data?.data.map((el, key) => {
              const titleLimit = !!el.rating ? 30 : 45
              return <CategoryBox key={key} padding="10px" onClick={async () => {
                ProductTypeModel.updateProductType({ value: el.id.toString(), updateState: product.methods.updateState })
                dispatch({
                  type: "updateProduct", params: {
                    image: el?.image,
                    title: el?.title
                  }
                })
                product.methods.updateState('title', el?.title)
                product.methods.updateState('description', `<p>${el?.description}</p>`)
              }}>
                <Flex height={"full"} direction={"column"} gap={3}>
                  <Image src={el?.image} alt={el?.title} borderRadius="5px" width="100%" />
                  <Flex flex={1} direction={"column"} justifyContent={"space-between"} gap={3}>
                    <AppTypography fontSize='14px' fontWeight={500}>
                      {
                        el.title.length <= titleLimit ? el.title :
                          <AppTooltip label={el.title}>{`${el.title.slice(0, titleLimit)}...`}</AppTooltip>
                      }
                    </AppTypography>
                    {el.priceRange && <AppTypography color="#C2C2C2">{el.priceRange}</AppTypography>}
                    {el.rating &&
                      <Flex justifyContent="space-between" alignItems={"center"}>
                        <AppTypography color="#C2C2C2">Quality</AppTypography>
                        <StarRating rate={el.rating} />
                      </Flex>
                    }
                  </Flex>
                </Flex>
              </CategoryBox>
            })}
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