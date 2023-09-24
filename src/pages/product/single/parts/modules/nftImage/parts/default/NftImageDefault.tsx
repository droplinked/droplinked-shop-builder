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
                    <FieldLabel label='NFT Image' isRequired />
                    <AppTypography size='14px' color="#808080">it could be the image file you wanna create NFT for, or only a cover for your main product</AppTypography>
                </VStack>
            </Flex>
            <Box>
                <AppUploadImage onChange={(images: any) => updateState("media", refactorImage(images.map(el => ({ url: el.original, thumbnail: el.small }))))} values={media} mode="single" />
            </Box>
            {<AlertProduct text='Once you publish your product this image will be tokenized as NFT and can not be changed' />}
        </VStack>
    )
}

export default NftImageDefault