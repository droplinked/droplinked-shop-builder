import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import EmbedCode from '../embedCode/EmbedCode'
import HeaderIconsColor from './parts/icons/HeaderIconsColor'
import OptionLogo from './parts/logo/OptionLogo'
import OptionUploadLogo from './parts/upload/OptionUploadLogo'

function DesignPageHeader() {
    return (
        <DesignPageCard title='Header' description='Provide header details'>
            <VStack align="stretch" spacing="24px">
                <OptionLogo />
                <OptionUploadLogo />
                <HeaderIconsColor />
                <EmbedCode />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageHeader