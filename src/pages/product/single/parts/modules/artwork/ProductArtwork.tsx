import { VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import ArtworkNormal from './parts/normal/ArtworkNormal'

function ProductArtwork() {
    const { store: { state: { print_positions } } } = useContext(productContext)

    return (
        <>
            {print_positions.length ? (
                <>
                    <VStack align="stretch" spacing={5}>
                        <ProductPageTitle
                            title='Artwork'
                            isReuired
                            description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
                        />
                        <ArtworkNormal />
                    </VStack>
                </>
            ) : null}
        </>
    )
}

export default ProductArtwork