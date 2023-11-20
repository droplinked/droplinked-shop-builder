import { Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ProductPositions from '../../../positions/ProductPositions'
import ArtworkImage from '../image/ArtworkImage'

function ArtworkNormal() {
    const { state: { artwork, artwork2, artwork_position, artwork2_position }, store: { state: { print_positions } }, methods: { updateState } } = useContext(productContext)

    return (
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
                        <AppTypography fontSize='12px' color="#C2C2C2">{capitalizeFirstLetter(el.name)}</AppTypography>
                        <ArtworkImage artwork={item.artwork} updateState={(data: any) => updateState(item.artwork_name, data)} />
                        {item.artwork && <ProductPositions positions={el.positions.map(pos => pos.value)} update={(data: string) => updateState(item.artwork_position_name, data)} state={[item.artwork_position]} />}
                    </VStack>
                )
            })}
        </Flex>
    )
}

export default ArtworkNormal