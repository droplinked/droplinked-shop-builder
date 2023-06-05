import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'
import SkeletonProduct from 'pages/product/single/parts/modules/skeleton/SkeletonProduct'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useCallback, useContext } from 'react'
import propertiesFormContext from '../../context'
import PropertiesFormModel from '../../model/model'
import PropertyButton from '../button/PropertyButton'
import PropertyItem from './parts/item/PropertyItem'
import PropertyOptions from './parts/options/PropertyOptions'

function PropertyFormProduct() {
    const { state: { properties }, methods: { updateState },productID } = useContext(productContext)
    const { addProperty } = PropertiesFormModel

    // Create new property  
    const create = useCallback((value: any, key: number) => {
        updateState("properties", addProperty({
            state: properties,
            index: key,
            value
        }))
    }, [properties])

    return (
        <>
            <Flex justifyContent={"space-between"}>
                <ProductPageTitle
                    head
                    isReuired
                    title='Product Properties'
                    description='Add at least one property to enable all variant fields.'
                />
                {!productID ? <PropertyButton state={properties} types={typesProperties} /> : null}
            </Flex>
            <SkeletonProduct>
                <VStack align={"stretch"} spacing={3}>
                    {properties.length ? properties.map((el, keyProperty) => (
                        <VStack background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} key={keyProperty} width={"100%"}>
                            <HStack>
                                <Box width={"20%"}><AppTypography size="14px" color="#FFF">Property</AppTypography></Box>
                                <Box width={"80%"}>
                                    <PropertyOptions element={el} value={el.value} onChange={(e: any) => create(e.target.value, keyProperty)} />
                                </Box>
                            </HStack>
                            {el.value && (
                                <HStack>
                                    <Box width={"20%"}><AppTypography size="14px" color="#FFF">Values</AppTypography></Box>
                                    <Box width={"80%"}><PropertyItem element={el} keyProperty={keyProperty} /></Box>
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