import { Box, Flex, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import ArtworkImage from './parts/image/ArtworkImage'
import AppTypography from 'components/common/typography/AppTypography'
import ProductPositions from '../positions/ProductPositions'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'

function ProductArtwork() {
    const { state: { artwork, artwork2, artwork_position, artwork2_position }, store: { state: { print_positions } }, methods: { updateState } } = useContext(productContext)

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
                        <Flex gap={10}>
                            {print_positions.map((el: any, key: number) => {
                                const isSecend = key > 0
                                const item = {
                                    artwork: isSecend ? artwork2 : artwork,
                                    artwork_name: isSecend ? "artwork2" : "artwork",
                                    artwork_position: isSecend ? artwork2_position : artwork_position,
                                    artwork_position_name: isSecend ? "artwork2_position" : "artwork_position"
                                }
                                return (
                                    <VStack key={key} align="stretch" width="50%">
                                        <AppTypography size='12px' color="#C2C2C2">{capitalizeFirstLetter(el.name)}</AppTypography>
                                        <ArtworkImage artwork={item.artwork} updateState={(data: any) => updateState(item.artwork_name, data)} />
                                        {item.artwork && <ProductPositions positions={el.positions.map(pos => pos.value)} update={(data: string) => updateState(item.artwork_position_name, data)} state={[item.artwork_position]} />}
                                    </VStack>
                                )
                            })}
                        </Flex>
                    </VStack>
                </>
            ) : null}
        </>
    )
}

export default ProductArtwork