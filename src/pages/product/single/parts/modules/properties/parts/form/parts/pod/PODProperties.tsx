import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import propertiesFormContext from '../../context'
import { PODPropertiesModel } from './PODProperties_model'
import classes from './style.module.scss'

function PODProperties() {
    const { state: { product_type, properties, pod_blank_product_id }, methods: { updateState }, store: { state: { variants } } } = useContext(productContext)
    const { set, remove } = useContext(propertiesFormContext)
    const { getProperties } = PODPropertiesModel
    const [Toggle, setToggle] = useState(false)

    useEffect(() => {
        if (!properties.length && !properties.length && product_type == "PRINT_ON_DEMAND") {
            const properties = [
                {
                    "value": "62a989ab1f2c2bbc5b1e7153",
                    "title": "Color",
                    "items": []
                },
                {
                    "value": "62a989e21f2c2bbc5b1e7154",
                    "title": "Size",
                    "items": []
                },
            ]
            updateState("properties", properties)
        }
    }, [product_type, properties])


    const makeproperties = useMemo(() => {
        const blank_options = variants?.blank_options
        if (!blank_options || !blank_options.length) return null
        return getProperties({ pod_blank_product_id, providers: blank_options[0] })
    }, [variants])

    const checkItem = useCallback((name: string) => {
        return properties.find(eel => eel.items.find(e => e.value === name))
    }, [properties])

    const addProperty = useCallback((value: string, model: string) => {
        const getVariantID = typesProperties.find(el => el.name === model)
        if (checkItem(value)) {
            remove(value, model === "Color" ? 0 : 1)
        } else {
            set({
                item: {
                    value,
                    variantID: getVariantID._id
                }
            })
        }
    }, [properties])

    return (
        <VStack align={"stretch"}>
            <Flex justifyContent={"space-between"}>
                <ProductPageTitle
                    head
                    isReuired
                    title='Product Properties'
                    description='Add at least one property to enable all variant fields.'
                />
                <BasicButton onClick={() => setToggle(prev => !prev)} variant='outline' sizes='medium'>Manage</BasicButton>
            </Flex>
            {Toggle && makeproperties && (
                <VStack color={"#FFF"} background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} width={"100%"}>
                    <Flex>
                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Colors</AppTypography></Box>
                        <Flex width={"80%"} flexWrap="wrap" gap={3}>
                            {makeproperties.colors.map((el, key) => (
                                <Box
                                    key={key}
                                    borderRadius="100%"
                                    onClick={() => addProperty(el.name, "Color")}
                                    width="32px"
                                    height="32px" cursor="pointer"
                                    background={el.code}
                                    className={`${checkItem(el.name) ? classes.active : ""} ${classes.box}`}
                                >
                                </Box>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex>
                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Sizes</AppTypography></Box>
                        <Box width={"80%"}>
                            <Flex width={"80%"} flexWrap="wrap" gap={3}>
                                {makeproperties.sizes.map((el, key) => (
                                    <Box
                                        key={key}
                                        borderRadius="28px"
                                        onClick={() => addProperty(el, "Size")}
                                        padding="6px 16px"
                                        cursor="pointer"
                                        background="#1C1C1C"
                                        className={`${checkItem(el) ? classes.active : ""} ${classes.box}`}
                                    >
                                        {el}
                                    </Box>
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