import { Box, Flex, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import ArtworkImage from './parts/image/ArtworkImage'
import AppTypography from 'components/common/typography/AppTypography'
import ProductPositions from '../positions/ProductPositions'

function ProductArtwork() {
    const { state: { artwork, artwork2, artwork_position, artwork2_position }, methods: { updateState } } = useContext(productContext)

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
                    <ArtworkImage artwork={artwork} field="artwork" updateState={(data: any) => updateState("artwork", data[0])} />
                    {artwork && <ProductPositions posistion='front' update={(data: string) => updateState("artwork_position", data)} state={[artwork_position]} />}
                </VStack>
                <VStack align="stretch" width="50%">
                    <AppTypography size='12px' color="#C2C2C2">Back Artwork</AppTypography>
                    <ArtworkImage artwork={artwork2} field="artwork2" updateState={(data: any) => updateState("artwork2", data[0])} />
                    {artwork2 && <ProductPositions posistion='back' update={(data: string) => updateState("artwork2_position", data)} state={[artwork2_position]} />}
                </VStack>
            </Flex>
        </VStack>
    )
}

export default ProductArtwork