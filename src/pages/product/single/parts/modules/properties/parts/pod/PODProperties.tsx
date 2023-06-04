import { Box, Button, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import ProductPageTitle from 'pages/product/single/parts/modules/title/ProductPageTitle'
import React, { useContext, useMemo, useState } from 'react'
import { IPODPropertiesOutput, PODPropertiesModel } from './PODProperties_model'

function PODProperties() {
    const { state: { pod_blank_product_id }, store: { state: { variants } } } = useContext(productContext)
    const { getProperties } = PODPropertiesModel
    const [Toggle, setToggle] = useState(false)

    const makeproperties = useMemo(() => {
        const blank_options = variants?.blank_options
        if (!blank_options || !blank_options.length) return null
        return getProperties({ pod_blank_product_id, providers: blank_options[0] })
    }, [variants])

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
                                <Box key={key} borderRadius="100%" width="32px" height="32px" cursor="pointer" background={el.code}></Box>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex>
                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Sizes</AppTypography></Box>
                        <Box width={"80%"}>
                            <Flex width={"80%"} flexWrap="wrap" gap={3}>
                                {makeproperties.sizes.map((el, key) => (
                                    <Box key={key} borderRadius="28px" padding="6px 16px" cursor="pointer" background="#1C1C1C">
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