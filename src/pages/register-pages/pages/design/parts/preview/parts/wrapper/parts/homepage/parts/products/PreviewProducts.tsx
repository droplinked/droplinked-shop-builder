import { Box, SimpleGrid, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'

function PreviewProducts() {
    const { state: { shop: { shopDesign: { productListTitle } } } } = useContext(designContext)

    return (
        <VStack align="stretch">
            {productListTitle && <PreviewTypo fontSize="16px" fontWeight="bold">{productListTitle}</PreviewTypo>}
            <SimpleGrid columns={3} spacing="15px">
                <Box height="200px" backgroundColor="#555"></Box>
                <Box height="200px" backgroundColor="#555"></Box>
                <Box height="200px" backgroundColor="#555"></Box>
                <Box height="200px" backgroundColor="#555"></Box>
                <Box height="200px" backgroundColor="#555"></Box>
            </SimpleGrid>
        </VStack>
    )
}

export default PreviewProducts