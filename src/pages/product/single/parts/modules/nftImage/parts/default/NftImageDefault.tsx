import { Box, Flex, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { productContext } from 'pages/product/single/context'
import introductionClass from 'pages/product/single/parts/general/model'
import React, { useContext } from 'react'
import AlertProduct from '../../../alert/AlertProduct'

function NftImageDefault() {
    const { state: { media }, methods: { updateState } } = useContext(productContext)
    const { refactorImage } = introductionClass

    return (
        <VStack align="stretch" spacing="20px">
            <Flex justifyContent="space-between" alignItems='center'>
                <VStack align="stretch">
                    <FieldLabel label='Cover Image' isRequired />
                    <AppTypography fontSize='14px' color="#808080">Upload an image to represent the product in your storefront and blockchain wallet.</AppTypography>
                </VStack>
            </Flex>
            <Box>
                <AppUploadImage onChange={(images: any) => updateState("media", refactorImage(images.map(el => ({ url: el.original, thumbnail: el.small }))))} values={media} mode="single" />
            </Box>
            {<AlertProduct text='The cover image will become immutable after the product is dropped and published' />}
        </VStack>
    )
}

export default NftImageDefault