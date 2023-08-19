import { VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import Artwork2d from './parts/2d/Artwork2d'
import ArtworkNormal from './parts/normal/ArtworkNormal'

function ProductArtwork() {
    const { state: { positions }, store: { state: { print_positions } }, productID } = useContext(productContext)

    const exactDimensions = useMemo(() => {
        return print_positions.find(el => el.positions.find(pos => pos.exactDimensions))
    }, [print_positions])

    return (
        <>
            {print_positions.length || (positions && productID) ? (
                <>
                    <VStack align="stretch" spacing={5}>
                        <ProductPageTitle
                            title='Artwork'
                            isReuired
                            description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
                        />
                        {exactDimensions ? <Artwork2d /> : <ArtworkNormal />}
                    </VStack>
                </>
            ) : null}
        </>
    )
}

export default ProductArtwork