import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import classes from './style.module.scss'

function NftImage() {
    const { loading } = useContext(productContext)

    return (
        <VStack align="stretch" spacing="20px">
            <VStack align="stretch">
                <FieldLabel label='NFT Image' isRequired loading={loading} />
                <AppTypography size='14px' color="#808080">it could be the image file you wanna create NFT for, or only a cover for your main product</AppTypography>
            </VStack>
            <Box>
                <AppUploadImage onChange={() => { }} values={[]} mode="single" />
            </Box>
            <Flex alignItems="center" gap="10px">
                <AppIcons.InfoIcon className={classes.icon} />
                <AppTypography size='12px' color="#FEB900">Once you publish your product this image will be tokenized as NFT and can not be changed</AppTypography>
            </Flex>
        </VStack>
    )
}

export default NftImage