import { VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useState } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'
import optionSocialModel from './model'
import SocialInputs from './parts/inputs/SocialInputs'

function OptionSocial() {
    const [Socials, setSocials] = useState('')
    const { items } = optionSocialModel

    const change = useCallback((e) => {
        const value = e.target.value
        if (value) setSocials(value)
        e.target.value = ''
    }, [])

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Social Links' />
            <SocialInputs socials={Socials} updateSocial={(value) => setSocials(value)} />
            <AppSelectBox name='' onChange={change} items={items} />
            <AppTypography fontSize="14px" color="#808080">Select social network and enter your username</AppTypography>
        </VStack>
    )
}

export default OptionSocial