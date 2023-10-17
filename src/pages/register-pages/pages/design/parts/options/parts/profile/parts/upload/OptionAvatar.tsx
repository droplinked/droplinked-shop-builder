import { VStack } from '@chakra-ui/react'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import React, { useState } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionAvatar() {
    const [Test, setTest] = useState('')
    return (
        <VStack align="stretch">
            <OptionsCaption caption='Profile Logo' />
            <AppUploadImage onChange={(image) => setTest(image)} size="original" values={Test} mode="horizontal" />
        </VStack>
    )
}

export default OptionAvatar