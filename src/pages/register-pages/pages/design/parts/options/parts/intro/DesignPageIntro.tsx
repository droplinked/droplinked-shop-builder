import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import EmbedCode from '../embedCode/EmbedCode'
import ColorDescription from './parts/color/ColorDescription'
import BannerDescription from './parts/description/BannerDescription'
import OptionBanner from './parts/image/OptionBanner'
import OptionLayout from './parts/layout/OptionLayout'

function DesignPageIntro() {
    return (
        <DesignPageCard title='Hero Section' section='hero' isRequired>
            <VStack align="stretch" spacing="24px">
                <OptionLayout />
                <OptionBanner />
                <BannerDescription />
                <ColorDescription />
                <Box paddingTop="20px"><EmbedCode /></Box>
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageIntro