import { Box, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Artwork2dSku from './parts/sku/Artwork2dSku'
import Artwork2dUpload from './parts/upload/Artwork2dUpload'

function Artwork2dDetails() {
    return (
        <VStack align="stretch" spacing="30px">
            <Box><AppTypography fontSize='14px'>Once you save the design, the product cost will be updated based on your selected print positions.</AppTypography></Box>
            <Box><Artwork2dUpload /></Box>
            <Box><Artwork2dSku /></Box>
        </VStack>
    )
}

export default Artwork2dDetails