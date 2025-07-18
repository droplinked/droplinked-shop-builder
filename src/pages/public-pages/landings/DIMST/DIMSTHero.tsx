import { useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import CalculationSections from './CalculationSections'

export default function DIMSTHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { t } = useLocaleResources('public-pages/landings/DIMST')

    return (
        <>
            <HeroSection
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
            >
                {!isMobile && <CalculationSections />}
            </HeroSection>
            {isMobile && <CalculationSections />}
        </>
    )
}
