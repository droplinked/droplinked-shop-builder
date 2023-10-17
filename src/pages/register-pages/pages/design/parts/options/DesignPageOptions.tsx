import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageTemplate from './parts/design/DesignPageTemplate'
import DesignPageHeader from './parts/header/DesignPageHeader'

function DesignPageOptions() {
    return (
        <VStack align="stretch" spacing="18px">
            <DesignPageTemplate />
            <DesignPageHeader />
        </VStack>
    )
}

export default DesignPageOptions