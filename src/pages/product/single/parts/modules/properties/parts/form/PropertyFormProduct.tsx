import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { variantOptionsService } from 'lib/apis/variant/services'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'
import SkeletonProduct from 'pages/product/single/parts/modules/skeleton/SkeletonProduct'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useCallback, useContext } from 'react'
import { useQuery } from 'react-query'
import PropertiesFormModel from '../../model/model'
import PropertyButton from '../button/PropertyButton'
import PropertyItem from '../item/PropertyItem'
import PropertyOptions from './parts/options/PropertyOptions'

function PropertyFormProduct() {
    const { data, isLoading } = useQuery({
        queryFn: variantOptionsService,
        queryKey: "product_properties",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { state: { properties, publish_product }, methods: { updateState }, productID } = useContext(productContext)
    const { addProperty } = PropertiesFormModel

    // Create new property  
    const create = useCallback((value: any, key: number) => {
        updateState("properties", addProperty({
            state: properties,
            index: key,
            value
        }))
    }, [properties])

    const getProperties = useCallback((title: string) => {
        const datas = data?.data?.data
        if (!datas) return []
        const items = datas.find(el => el.name.toLowerCase() === title.toLowerCase())
        return items ? items : []
    }, [data])

    return (
        <>
            <Flex justifyContent={"space-between"}>
                <ProductPageTitle
                    head
                    isReuired
                    title='Product Properties'
                    description='Add at least one property to enable all variant fields.'
                />
                {productID && publish_product ? null : <PropertyButton state={properties} types={typesProperties} />}
            </Flex>
            <SkeletonProduct>
                <VStack align={"stretch"} spacing={3}>
                    {!isLoading && properties.length ? properties.map((el, keyProperty) => (
                        <VStack background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} key={keyProperty} width={"100%"}>
                            <HStack>
                                <Box width={"20%"}><AppTypography fontSize="14px" color="#FFF">Property</AppTypography></Box>
                                <Box width={"80%"}>
                                    <PropertyOptions element={el} value={el.value} onChange={(e: any) => create(e.target.value, keyProperty)} />
                                </Box>
                            </HStack>
                            {el.value && (
                                <HStack>
                                    <Box width={"20%"}><AppTypography fontSize="14px" color="#FFF">Values</AppTypography></Box>
                                    <Flex width={"80%"} flexWrap="wrap" gap={3}>
                                        {getProperties(el.title) && typeof getProperties(el.title)?.values === "object" && getProperties(el.title)?.values.map((item: any, key: number) => (
                                            <PropertyItem
                                                key={key}
                                                type={el.title === "Color" ? "Color" : "Size"}
                                                item={item}
                                                {...el.title === 'Color' && { hex: item.value }}
                                            />
                                        ))}
                                    </Flex>
                                </HStack>
                            )}
                        </VStack>
                    )) : null}
                </VStack>
            </SkeletonProduct>
        </>
    )
}

export default PropertyFormProduct