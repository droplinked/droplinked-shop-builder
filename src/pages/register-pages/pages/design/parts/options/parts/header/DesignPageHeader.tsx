import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import EmbedCode from '../embedCode/EmbedCode'
import HeaderIconsColor from './parts/icons/HeaderIconsColor'
import OptionUploadLogo from './parts/upload/OptionUploadLogo'
import IsHeaderFixed from './parts/fixed/IsHeaderFixed'

function DesignPageHeader() {
    return (
        <DesignPageCard title='Header' section='header'>
            <VStack align="stretch" spacing="24px">
                <OptionUploadLogo />
                <IsHeaderFixed/>
                <HeaderIconsColor />
                <Box paddingTop="20px"><EmbedCode /></Box>
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageHeader