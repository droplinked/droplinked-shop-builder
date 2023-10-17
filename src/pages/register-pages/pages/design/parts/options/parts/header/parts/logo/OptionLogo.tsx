import { VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionLogo() {
    return (
        <VStack align="stretch">
            <OptionsCaption caption='logo' />
            <AppSelectBox items={[{ caption: "Image", value: "Image" }]} name="" />
            <AppTypography size="14px" color="#808080">sample</AppTypography>
        </VStack>
    )
}

export default OptionLogo