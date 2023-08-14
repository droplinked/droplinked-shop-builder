import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { IpodVariantsService } from 'lib/apis/pod/interfaces'
import { podVariantsService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import PropertyItem from '../item/PropertyItem'

function PODProperties() {
    const { state: { properties }, methods: { updateState }, store: { state: { variants } } } = useContext(productContext)
    const { mutate, data, isLoading } = useMutation((params: IpodVariantsService) => podVariantsService(params))
    const [Toggle, setToggle] = useState(false)

    useEffect(() => variants?._id && mutate({ productId: variants._id, provider: variants.provider }), [variants])

    const makeproperties = useCallback((title: string) => {
        const datas = data?.data?.data
        return datas ? datas.find(el => el.name === title)?.values || [] : []
    }, [data])


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
            {Toggle && (
                <VStack color={"#FFF"} background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} width={"100%"}>
                    <AppSkeleton isLoaded={!isLoading}>
                        <Flex>
                            <Box width={"20%"}><AppTypography size="14px" color="#FFF">Colors</AppTypography></Box>
                            <Flex width={"80%"} flexWrap="wrap" gap={3}>
                                {makeproperties('color').map(el => ({ caption: el.caption, value: el.value.includes("#") ? el.value : '#' + el.value })).map((el, key) => (
                                    <PropertyItem key={key} type="Color" item={el} />
                                ))}
                            </Flex>
                        </Flex>
                    </AppSkeleton>
                    <AppSkeleton isLoaded={!isLoading}>
                        <Flex>
                            <Box width={"20%"}><AppTypography size="14px" color="#FFF">Sizes</AppTypography></Box>
                            <Box width={"80%"}>
                                <Flex width={"80%"} flexWrap="wrap" gap={4}>
                                    {makeproperties('size').map((el, key) => (
                                        <PropertyItem key={key} type="Size" item={el} />
                                    ))}
                                </Flex>
                            </Box>
                        </Flex>
                    </AppSkeleton>
                </VStack>
            )}
        </VStack>
    )
}

export default PODProperties