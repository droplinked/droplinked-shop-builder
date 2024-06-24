import { VStack } from '@chakra-ui/react'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useState } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionAvatar() {
    const { methods: { dispatch }, state: { shop: { logo } } } = useContext(designContext)

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Profile Logo' isRequired />
            <AppUploadImage onChange={(image) => dispatch({ type: 'updateShop', params: { logo: image } })} size="original" values={logo} mode="horizontal" />
        </VStack>
    )
}

export default OptionAvatar