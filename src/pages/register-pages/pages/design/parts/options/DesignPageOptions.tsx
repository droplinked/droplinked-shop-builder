import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageTemplate from './parts/design/DesignPageTemplate'
import DesignPageHeader from './parts/header/DesignPageHeader'
import DesignPageIntro from './parts/intro/DesignPageIntro'

function DesignPageOptions() {
    return (
        <VStack align="stretch" spacing="18px">
            <DesignPageTemplate />
            <DesignPageHeader />
            <DesignPageIntro />
        </VStack>
    )
}

export default DesignPageOptions