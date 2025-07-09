// Unstoppable Domains TLD features section
import React from 'react'
import { Box } from '@chakra-ui/react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Features from '../../assets/Features'
import DomainGrid from './DomainGrid'

export default function UDTldFeatures() {
    // Array of all domain names
    const domains = [
        '.tech', '.moon', '.store', '.pudgy', '.com', '.unstoppable',
        '.dream', '.live', '.space', '.group', '.org', '.net', '.life',
        '.digital', '.secret', '.polygon', '.pw', '.io', '.site'
    ]
    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='SET OF FEATURES'
            headingTitle={`Featured TLD's`}
            headingSubtitle={`Unlock exclusive perks and benefits today by proving ownership`}
            typographySvg={<Features />}
        >
            <Box position="relative" overflow="hidden" maxW="100%">
                <DomainGrid domains={domains} />
                <Box
                    w="100%"
                    h="100%"
                    position="absolute"
                    left={0}
                    top={0}
                    bgGradient="linear(to-r, #0a0a0a, transparent, #0a0a0a)"
                    pointerEvents="none"
                    zIndex={1}
                    maxW="100%"
                />
            </Box>
        </SectionContainer>
    )
} 