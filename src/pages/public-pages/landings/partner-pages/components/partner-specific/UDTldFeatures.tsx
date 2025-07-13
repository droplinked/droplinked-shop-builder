// Unstoppable Domains TLD features section
import React from 'react'
import { Box } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Features from '../../assets/Features'
import DomainGrid from './DomainGrid'
import localEn from 'locales/public-pages/landings/partner-pages/en.json'
import localAr from 'locales/public-pages/landings/partner-pages/ar.json'

export default function UDTldFeatures() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages', {
        en: localEn,
        ar: localAr
    });
    
    // Array of all domain names
    const domains = [
        '.tech', '.moon', '.store', '.pudgy', '.com', '.unstoppable',
        '.dream', '.live', '.space', '.group', '.org', '.net', '.life',
        '.digital', '.secret', '.polygon', '.pw', '.io', '.site'
    ]
    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle={t('udFeatures.sectionTitle')}
            headingTitle={t('udFeatures.headingTitle')}
            headingSubtitle={t('udFeatures.headingSubtitle')}
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