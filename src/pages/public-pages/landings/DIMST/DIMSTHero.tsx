import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import CalculationSections from './CalculationSections'

export default function DIMSTHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <>
            <HeroSection
                title={`Product Record Calculator`}
                subtitle="Project anticipated ROI when using droplinked's enterprise inventory management and sales tracking"
            >
                {!isMobile && <CalculationSections />}
            </HeroSection>
            {isMobile && <CalculationSections />}
        </>
    )
}
