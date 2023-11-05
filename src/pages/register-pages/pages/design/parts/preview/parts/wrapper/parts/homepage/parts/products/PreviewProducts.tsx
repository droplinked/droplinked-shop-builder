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
    const { shop } = useProfile()
    const { state: { shop: { shopDesign: { productListTitle, textColorParagraphs } }, device } } = useContext(designContext)
    const { mutate, data } = useMutation((shopname: string) => productsShopervices(shopname))

    useEffect(() => {
        if (shop) mutate(shop?.name)
    }, [shop])

    const isDesktop = useMemo(() => device === "desktop", [device])
    const products = useMemo(() => data?.data?.data, [data])
    
    return (
        <VStack align="stretch">
            {productListTitle && <PreviewTypo fontSize="16px" fontWeight="bold">{productListTitle}</PreviewTypo>}
            <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} rowGap="40px" spacing={isDesktop ? "25px" : "10px"}>
                {products && products?.data ? products.data.map((el, key) => (
                    <VStack key={key} align="stretch" spacing="3px">
                        <Image width="100%" paddingBottom="4px" borderRadius="2px" src={el.media.find(img => img.isMain === "true")?.thumbnail} />
                        <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="center" color={textColorParagraphs || "#FFF"}>{el.title.substr(0, 20)}</PreviewTypo>
                        <PreviewTypo fontSize="12px" fontWeight="bold" textAlign="center" opacity=".5" color={textColorParagraphs || "#FFF"}>{getMinMaxArray(el.skuIDs.map(sku => sku.price)).min} {el?.priceUnit}</PreviewTypo>
                    </VStack>
                )) : null}
            </SimpleGrid>
        </VStack>
    )
}

export default PreviewProducts