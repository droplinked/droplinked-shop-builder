import { Box, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import ProductPositions from 'pages/product/single/parts/modules/positions/ProductPositions'
import React, { useContext } from 'react'
import ArtworkImage from '../../../../../image/ArtworkImage'

function Artwork2dUpload() {
    const { state: { artwork }, productID, methods: { updateState } } = useContext(productContext)

    return (
        <VStack align="stretch">
            {/* <Box><ProductPositions positions={['front']} state={[]} update={() => { }} /></Box> */}
            <Box><ArtworkImage isDisable={Boolean(productID)} artwork={artwork} updateState={(image) => {
                updateState('artwork', image)
                updateState('media', [])
            }} /></Box>
        </VStack>
    )
}

export default Artwork2dUpload