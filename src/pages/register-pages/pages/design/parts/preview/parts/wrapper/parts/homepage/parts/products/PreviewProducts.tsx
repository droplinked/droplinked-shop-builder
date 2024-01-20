import { Box, SimpleGrid, VStack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { productsShopervices } from 'lib/apis/product/productServices'
import { getMinMaxArray } from 'lib/utils/heper/helpers'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'

function PreviewProducts() {
    const { state: { shop: { shopDesign: { productListTitle, textColorParagraphs } }, device } } = useContext(designContext)

    const isDesktop = useMemo(() => device === "desktop", [device])

    return (
        <VStack align="stretch">
            {productListTitle && <PreviewTypo fontSize="16px" fontfontWeight="bold">{productListTitle}</PreviewTypo>}
            <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} rowGap="40px" spacing={isDesktop ? "25px" : "10px"}>
                {[1, 1, 1, 1, 1, 1].map((el, key) => (
                    <VStack key={key} align="stretch" spacing="3px">
                        <Image width="100%" paddingBottom="4px" borderRadius="2px" src="/assets/images/templated/sample.png" />
                        <PreviewTypo fontSize="12px" fontfontWeight="bold" textAlign="center" color={textColorParagraphs || "#FFF"}>Pancho</PreviewTypo>
                        <PreviewTypo fontSize="12px" fontfontWeight="bold" textAlign="center" opacity=".5" color={textColorParagraphs || "#FFF"}>30.00 USD</PreviewTypo>
                    </VStack>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default PreviewProducts