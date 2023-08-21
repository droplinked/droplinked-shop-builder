import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import Artwork2dSkuModel from './model'

function PropertiesPod() {
    const { state: { sku } } = useContext(productContext)
    const { options } = Artwork2dSkuModel

    return (
        <>
            {sku.length ? (
                <VStack align="stretch">
                    <Flex gap={"10px"}>
                        <Box><AppTypography size='14px'>Available Colors:</AppTypography></Box>
                        <Flex gap={"5px"}>
                            {options(sku).colors.map((el, key) => (
                                <Box key={key} backgroundColor={el.value} width="18px" height="18px" borderRadius="100%"></Box>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex gap={"10px"}>
                        <Box><AppTypography size='14px'>Available Size: </AppTypography></Box>
                        <Flex gap={"10px"}>
                            {options(sku).sizes.map((el, key) => (
                                <Box key={key}><AppTypography size='14px'>{el.caption}</AppTypography></Box>
                            ))}
                        </Flex>
                    </Flex>
                </VStack>
            ) : null}
        </>
    )
}

export default PropertiesPod