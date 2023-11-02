import { Box, SimpleGrid, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'

function PreviewProducts() {
    const { state: { shop: { shopDesign: { productListTitle } }, device } } = useContext(designContext)

    const isDesktop = useMemo(() => device === "desktop", [device])

    return (
        <VStack align="stretch">
            {productListTitle && <PreviewTypo fontSize="16px" fontWeight="bold">{productListTitle}</PreviewTypo>}
            <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} spacing={isDesktop ? "15px" : "10px"}>
                {[1, 1, 1, 1, 1].map((el, key) => (
                    <Box key={key} height={isDesktop ? { base: "100px", "2xl": "200px" } : "100px"} backgroundColor="#555"></Box>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default PreviewProducts