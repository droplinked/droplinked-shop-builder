import { VStack } from '@chakra-ui/layout'
import React from 'react'
import PreviewHiro from './parts/hiro/PreviewHiro'
import PreviewHomepage from './parts/homepage/PreviewHomepage'

function PreviewWrapper() {

    return (
        <VStack align="stretch" spacing="20px">
            <PreviewHiro />
            <PreviewHomepage />
        </VStack>
    )
}

export default PreviewWrapper