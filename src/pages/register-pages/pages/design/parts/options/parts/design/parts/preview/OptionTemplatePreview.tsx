import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionTemplatePreview() {
    const { state: { shop: { shopDesign: { foreground, backgroundBody } } } } = useContext(designContext)

    const getImage = useMemo(() => {
        if (backgroundBody === "#F9F9F6" && foreground === "#FFFFFF") return '/assets/images/templated/Frame20603.jpg'
        else if (backgroundBody === "#FFFFFF" && foreground === "#F7F7F2") return '/assets/images/templated/Frame21325.jpg'
        else if (backgroundBody === "#FFFFFF" && foreground === "#EFECDC") return '/assets/images/templated/Frame206031.jpg'
        else if (backgroundBody === "#27262B" && foreground === "#0A0A0A") return '/assets/images/templated/Frame206032.jpg'
        else if (backgroundBody === "#11151A" && foreground === "#262738") return '/assets/images/templated/Frame206033.jpg'
        else if (backgroundBody === "#11161A" && foreground === "#263138") return '/assets/images/templated/Frame206033.jpg'
        else return '/assets/images/templated/Frame20603.jpg'
    }, [foreground, backgroundBody])

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Template' isRequired />
            <Flex gap="14px">
                <Box width="50%"><Image src={getImage} width="100%" borderRadius="15px" /></Box>
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