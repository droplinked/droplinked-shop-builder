import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import QuestWindow from './quests/QuestWindow'

export default function SocialQuestsHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <>
            <HeroSection
                title="It's Time to Level Up"
                subtitle={`Get started on droplinked quests to earn points. As you earn towards each level,\nyou unlock access to credits and tools that help you to earn more $`}
            >
                {!isMobile &&
                    <HeroChildFrame>
                        <QuestWindow />
                    </HeroChildFrame>
                }
            </HeroSection>
            {isMobile &&
                <HeroChildFrame>
                    <QuestWindow />
                </HeroChildFrame>
            }
        </>
    )
}
