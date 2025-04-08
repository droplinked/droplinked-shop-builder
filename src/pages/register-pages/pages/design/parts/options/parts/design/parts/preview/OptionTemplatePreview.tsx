import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionTemplatePreview() {
    const templateImage = '/assets/images/templated/template.png'

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Template' isRequired />
            <Flex gap="14px" >
                <Box width="50%"><ActiveBox active={true} props={{ borderRadius: "13px" }}><Image src={templateImage} width="100%" borderRadius="15px" /></ActiveBox></Box>
                <Flex width="50%" backgroundColor="#141414" onClick={() => window.open('mailto:support@droplinked.com')} cursor="pointer" borderRadius="15px" alignItems="center" padding="10px" textAlign="center">
                    <VStack justifyContent="center" >
                        <AppIcons.Email />
                        <AppTypography fontSize="12px" color="#808080">Order a customized template</AppTypography>
                    </VStack>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default OptionTemplatePreview