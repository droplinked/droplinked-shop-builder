import { VStack } from '@chakra-ui/react';
import AppColorPicker from 'components/common/colorPicker/AppColorPicker';
import { designContext } from 'pages/register-pages/pages/design/design-context';
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption';

function HeaderIconsColor() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { iconHeaderColor } } } } = useContext(designContext)

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Icon Color' />
            <AppColorPicker onChange={(color) => dispatch({ type: 'updateShop', params: { shopDesign: { iconHeaderColor: color } } })} value={iconHeaderColor} />
        </VStack>
    )

}

export default HeaderIconsColor