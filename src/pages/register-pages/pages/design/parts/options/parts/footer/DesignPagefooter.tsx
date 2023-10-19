import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import AdditionalLinkes from '../additional/AdditionalLinkes'
import DesignPageCard from '../card/DesignPageCard'
import EmbedCode from '../embedCode/EmbedCode'

function DesignPagefooter() {
    return (
        <DesignPageCard title='Footer'>
            <VStack align="stretch" spacing="24px">
                <AdditionalLinkes element='footerLinks' />
                <Box paddingTop="20px"><EmbedCode /></Box>
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPagefooter