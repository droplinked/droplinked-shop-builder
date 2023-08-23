import { Flex, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import ProductModel from 'pages/product/single/model'
import React, { useContext, useMemo } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import Artwork2d from './parts/2d/Artwork2d'
import ArtworkNormal from './parts/normal/ArtworkNormal'
import PropertiesPod from './parts/properties/PropertiesPod'

function ProductArtwork() {
    const { state: { positions, prodviderID,pod_blank_product_id }, store: { state: { print_positions } }, productID } = useContext(productContext)

    const title = useMemo(() => (
        <ProductPageTitle
            title='POD Design'
            isReuired
            description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
        />
    ), [])

    return (
        <>
            {(ProductModel.isPrintful(prodviderID) && pod_blank_product_id) || (print_positions.length || (positions && productID)) ? (
                <>
                    {ProductModel.isPrintful(prodviderID) ? (
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