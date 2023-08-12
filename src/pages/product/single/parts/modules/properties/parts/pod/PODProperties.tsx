import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import PropertyItem from '../item/PropertyItem'
import { PODPropertiesModel } from './PODProperties_model'

function PODProperties() {
    const { state: { properties, pod_blank_product_id, publish_product }, productID, methods: { updateState }, store: { state: { variants } } } = useContext(productContext)
    const { getProperties } = PODPropertiesModel
    const [Toggle, setToggle] = useState(false)

    const makeproperties = useMemo(() => {
        const blank_options = variants?.blank_options
        if (!blank_options || !blank_options.length) return null
        return getProperties({ pod_blank_product_id, providers: blank_options[0] })
    }, [variants])


    const createProperty = useCallback(() => {
        const getItems = (property: string) => properties.find(el => el.title === property)

        if (properties.length !== 2) {
            updateState("properties", [
                {
                    "value": "62a989ab1f2c2bbc5b1e7153",
                    "title": "Color",
                    "items": getItems("Color") ? getItems("Color").items : []
                },
                {
                    "value": "62a989e21f2c2bbc5b1e7154",
                    "title": "Size",
                    "items": getItems("Size") ? getItems("Size").items : []
                }
            ])
        }
        setToggle(prev => !prev)
    }, [makeproperties])

    return (
        <VStack align={"stretch"}>
            <Flex justifyContent={"space-between"}>
                <ProductPageTitle
                    head
                    isReuired
                    title='Product Properties'
                    description='Add at least one property to enable all variant fields.'
                />
                <BasicButton onClick={createProperty} variant='outline' sizes='medium'>Manage</BasicButton>
            </Flex>
            {Toggle && makeproperties && (
                <VStack color={"#FFF"} background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} width={"100%"}>
                    <Flex>
                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Colors</AppTypography></Box>
                        <Flex width={"80%"} flexWrap="wrap" gap={3}>
                            {makeproperties.colors.map(el => ({ caption: el.name, value: el.code })).map((el, key) => (
                                <PropertyItem key={key} type="Color" item={el} />
                            ))}
                        </Flex>
                    </Flex>
                    <Flex>
                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Sizes</AppTypography></Box>
                        <Box width={"80%"}>
                            <Flex width={"80%"} flexWrap="wrap" gap={4}>
                                {makeproperties.sizes.map(el => ({ caption: el, value: el })).map((el, key) => (
                                    <PropertyItem key={key} type="Size" item={el} />
                                ))}
                            </Flex>
                        </Box>
                    </Flex>
                </VStack>
            )}
        </VStack>
    )
}

export default PODProperties