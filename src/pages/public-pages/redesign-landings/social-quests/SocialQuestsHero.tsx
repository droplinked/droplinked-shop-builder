import { Box, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'

export default function SocialQuestsHero() {
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })

    return (
        <HeroSection
            title="It’s Time to Level Up"
            subtitle={`Get started on droplinked quests to earn points. As you earn towards each level,\nyou unlock access to credits and tools that help you to earn more $`}
        >
            <Box paddingInline={paddingInline} margin="48px auto auto">
                hi
            </Box>
        </HeroSection>
    )
}
