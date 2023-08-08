import { Checkbox, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react'

function FullWidth() {
    const { state: { fullWidthHero }, methods: { updateState } } = useContext(designContext);

    return (
        <Checkbox marginTop="30px" onChange={e => updateState('fullWidthHero', e.target.checked)} size='md' alignItems="flex-start" colorScheme='green' isChecked={fullWidthHero}>
            <AppTypography position="relative" bottom="3px" color="#FFF" size='14px'>Display hero image at full width</AppTypography>
        </Checkbox>
    )
}

export default FullWidth