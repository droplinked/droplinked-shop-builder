import { Box, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import QuestWindow from './quests/QuestWindow'

export default function SocialQuestsHero() {
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })
    const isMobile = useBreakpointValue({ base: true, md: false })

    const boxBackground = isMobile ? "neutral.websiteBackground" : "radial-gradient(50% 100% at 50% 0%, rgba(43, 207, 161, 0.24) 0%, rgba(43, 207, 161, 0.00) 100%), linear-gradient(180deg, rgba(43, 207, 161, 0.08) 0%, rgba(43, 207, 161, 0.00) 100%)"

    return (
        <HeroSection
            title="It’s Time to Level Up"
            subtitle={`Get started on droplinked quests to earn points. As you earn towards each level,\nyou unlock access to credits and tools that help you to earn more $`}
        >
            <Box paddingInline={paddingInline} margin="48px auto auto">
                <Box
                    padding={{ base: "0px", md: "8px 8px 0px 8px" }}
                    border="1px solid rgba(43, 207, 161, 0.32)"
                    borderRadius={{ base: "24px", md: "24px 24px 0px 0px" }}
                    borderBottom="none"
                    background={boxBackground}
                    backdropFilter="blur(50px)"
                >
                    <Box background="neutral.websiteBackground" borderRadius={{ base: "24px", md: "16px 16px 0 0" }}>
                        <QuestWindow />
                    </Box>
                </Box>
            </Box>
        </HeroSection>
    )
}
