import { VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'
import optionSocialModel from './model'
import SocialInputs from './parts/inputs/SocialInputs'

function OptionSocial() {
    const [Socials, setSocials] = useState([])
    const { items } = optionSocialModel

    const keysSocials = useMemo(() => Socials.map(el => el), [Socials])
    
    return (
        <VStack align="stretch">
            <OptionsCaption caption='Social Links' />
            <SocialInputs socials={Socials} />
            <AppSelectBox name='' onChange={(e: any) => setSocials(prev => ([...prev, e.target.value]))} placeholder='---' items={items.filter(el => !keysSocials.includes(el.value))} />
            <AppTypography size="14px" color="#808080">Add your social media links to your Store profile</AppTypography>
        </VStack>
    )
}

export default OptionSocial