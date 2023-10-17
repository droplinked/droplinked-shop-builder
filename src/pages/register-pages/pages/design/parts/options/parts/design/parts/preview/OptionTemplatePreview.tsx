import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionTemplatePreview() {
    const images = [
        '/assets/images/templated/Frame20603.jpg',
        '/assets/images/templated/Frame21325.jpg',
        '/assets/images/templated/Frame206031.jpg',
        '/assets/images/templated/Frame206032.jpg',
        '/assets/images/templated/Frame206033.jpg',
        '/assets/images/templated/Frame213251.jpg',
    ]

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Design Template' />
            <Flex gap="14px">
                <Box width="50%"><Image src={images[0]} width="100%" borderRadius="15px" /></Box>
                <Flex width="50%" backgroundColor="#141414" onClick={() => window.open('mailto:support@droplinked.com')} cursor="pointer" borderRadius="15px" alignItems="center" padding="10px" textAlign="center">
                    <VStack justifyContent="center">
                        <AppIcons.Email />
                        <AppTypography size="12px" color="#808080">Order a customized template</AppTypography>
                    </VStack>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default OptionTemplatePreview