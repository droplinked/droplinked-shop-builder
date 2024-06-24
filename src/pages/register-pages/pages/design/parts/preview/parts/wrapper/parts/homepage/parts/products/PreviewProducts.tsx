import { SimpleGrid, VStack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'
import PreviewActive from '../../../../../parts/active/PreviewActive'

function PreviewProducts() {
    const { state: { shop: { shopDesign: { productListTitle, textColorParagraphs } }, device } } = useContext(designContext)
    const isDesktop = useMemo(() => device === "desktop", [device])

    return (
        <VStack align="stretch">
            {productListTitle && 
                <PreviewActive
                    section="products"
                    props={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 2px",
                        borderRadius: "6px",
                    }}
                >
                    <PreviewTypo fontSize="16px" fontWeight="bold" mb={0}>{productListTitle}</PreviewTypo>
                </PreviewActive>
            }
            <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} rowGap="40px" spacing={isDesktop ? "25px" : "10px"}>
                {[1, 1, 1, 1, 1, 1].map((el, key) => (
                    <VStack key={key} align="stretch" spacing="3px">
                        <Image width="100%" paddingBottom="4px" borderRadius="2px" src="/assets/images/templated/sample.png" />
                        <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="center" color={textColorParagraphs || "#FFF"}>Pancho</PreviewTypo>
                        <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="center" opacity=".5" color={textColorParagraphs || "#FFF"}>$30.00 USD</PreviewTypo>
                    </VStack>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default PreviewProducts