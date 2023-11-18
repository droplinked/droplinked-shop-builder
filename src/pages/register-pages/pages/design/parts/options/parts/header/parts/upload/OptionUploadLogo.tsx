import { VStack } from '@chakra-ui/react'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionUploadLogo() {
    const { methods: { dispatch }, state: { shop: { headerIcon } } } = useContext(designContext)
    return (
        <VStack align="stretch">
            <OptionsCaption caption='Site Logo' />
            <AppUploadImage onChange={(value) => dispatch({ type: 'updateShop', params: { headerIcon: value } })} size="original" values={headerIcon} mode="horizontal" />
        </VStack>
    )
}

export default OptionUploadLogo