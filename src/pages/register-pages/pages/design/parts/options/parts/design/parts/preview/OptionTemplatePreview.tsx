import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionTemplatePreview() {
    const { state: { shop: { templateID } } } = useContext(designContext)
    const images = {
        '6523b829f31b22884436a8da': '/assets/images/templated/Frame20603.jpg',
        '6523b829f31b22884436a8dc': '/assets/images/templated/Frame213251.jpg',
        '6523b829f31b22884436a8d9': '/assets/images/templated/Frame206031.jpg',
        '6523b829f31b22884436a8dd': '/assets/images/templated/Frame206032.jpg',
        '6523b829f31b22884436a8de': '/assets/images/templated/Frame206033.jpg',
        '6523b829f31b22884436a8db': '/assets/images/templated/Frame21325.jpg',
    }

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Design Template' />
            <Flex gap="14px">
                <Box width="50%"><Image src={images?.[templateID]} width="100%" borderRadius="15px" /></Box>
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