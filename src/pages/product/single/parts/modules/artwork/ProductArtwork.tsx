import { Flex, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import ProductArtworkModel from './model'
import Artwork2d from './parts/2d/Artwork2d'
import ArtworkNormal from './parts/normal/ArtworkNormal'
import PropertiesPod from './parts/properties/PropertiesPod'

function ProductArtwork() {
    const { state: { positions }, store: { state: { print_positions } }, productID } = useContext(productContext)

    const { exactDimensions } = ProductArtworkModel

    const title = useMemo(() => (
        <ProductPageTitle
            title='POD Design'
            isReuired
            description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
        />
    ), [])

    return (
        <>
            {print_positions.length || (positions && productID) ? (
                <>
                    {exactDimensions(print_positions) ? (
                        <VStack align="stretch" spacing={5}>
                            <Flex justifyContent="space-between" alignItems="center">
                                {title}
                                <Artwork2d />
                            </Flex>
                            <PropertiesPod />
                        </VStack>
                    ) : (
                        <VStack align="stretch" spacing={5}>
                            {title}
                            <ArtworkNormal />
                        </VStack>
                    )}
                </>
            ) : null}
        </>
    )
}

export default ProductArtwork