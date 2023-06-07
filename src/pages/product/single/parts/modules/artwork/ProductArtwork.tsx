import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import ArtworkImage from './parts/image/ArtworkImage'
import ProductMintToMerge from '../mintToMerge/ProductMintToMerge'
import AppTypography from 'components/common/typography/AppTypography'

function ProductArtwork() {
    const { state: { artwork, artwork2 }, methods: { updateState } } = useContext(productContext)

    return (
        <VStack align="stretch" spacing={5}>
            <ProductPageTitle
                title='Artwork'
                isReuired
                description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
            />
            <Flex gap={10}>
                <VStack align="stretch" width="50%">
                    <AppTypography size='12px' color="#C2C2C2">Front Artwork</AppTypography>
                    <ArtworkImage artwork={artwork} updateState={(data: any) => updateState("artwork", data)} />
                </VStack>
                <VStack align="stretch" width="50%">
                    <AppTypography size='12px' color="#C2C2C2">Back Artwork</AppTypography>
                    <ArtworkImage artwork={artwork2} updateState={(data: any) => updateState("artwork2", data)} />
                </VStack>
            </Flex>
        </VStack>
    )
}

export default ProductArtwork