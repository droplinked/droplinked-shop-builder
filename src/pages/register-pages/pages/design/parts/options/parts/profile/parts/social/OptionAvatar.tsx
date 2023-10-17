import { VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionSocial() {
    return (
        <VStack align="stretch">
            <OptionsCaption caption='Social Links' />
            <AppSelectBox name='' items={[{ caption: "Default", value: "Default" }]} />
            <AppTypography size="14px" color="#808080">Add your social media links to your Store profile</AppTypography>
        </VStack>
    )
}

export default OptionSocial