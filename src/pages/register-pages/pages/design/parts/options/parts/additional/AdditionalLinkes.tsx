import { VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React from 'react'
import OptionsCaption from '../caption/OptionsCaption'

function AdditionalLinkes() {
    return (
        <VStack align="stretch" spacing="24px">
            <OptionsCaption caption='Additional linkes' />
            <BasicButton sizes="large">Add Link</BasicButton>
        </VStack>
    )
}

export default AdditionalLinkes