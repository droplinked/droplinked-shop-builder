import { VStack } from '@chakra-ui/react'
import React from 'react'
import PreviewHiro from './parts/hiro/PreviewHiro'
import PreviewHomepage from './parts/homepage/PreviewHomepage'

function PreviewWrapper() {
    return (
        <VStack align="stretch" spacing="0">
            <PreviewHiro />
            <PreviewHomepage />
        </VStack>
    )
}

export default PreviewWrapper