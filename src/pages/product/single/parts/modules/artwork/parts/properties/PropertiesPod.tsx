import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useMemo } from 'react'
import Artwork2dSkuModel from './model'

function PropertiesPod() {
    const { state: { sku } } = useContext(productContext)
    const { options } = Artwork2dSkuModel

    const sizes = useMemo(() => {
        const size_clothes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL"]
        const size_available = options(sku)?.sizes?.map(el => el?.value);
        return size_clothes.includes(size_available?.[0]) ? size_clothes?.filter(el => size_available?.includes(el)) : size_available
    }, [sku])

    return (
        <>
            {sku.length ? (
                <VStack align="stretch">
                    <Flex gap={"10px"}>
                        <Box><AppTypography fontSize='14px'>Available Colors:</AppTypography></Box>
                        <Flex gap={"5px"}>
                            {options(sku)?.colors?.map((el, key) => (
                                <Box key={key} backgroundColor={el?.value} width="18px" height="18px" borderRadius="100%"></Box>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex gap={"10px"}>
                        <Box><AppTypography fontSize='14px'>Available Size: </AppTypography></Box>
                        <Flex gap={"10px"}>
                            {sizes?.map((el, key) => (
                                <Box key={key}><AppTypography fontSize='14px'>{el}</AppTypography></Box>
                            ))}
                        </Flex>
                    </Flex>
                </VStack>
            ) : null}
        </>
    )
}

export default PropertiesPod