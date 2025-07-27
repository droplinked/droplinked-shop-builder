import { useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import QuestWindow from './quests/QuestWindow'

export default function SocialQuestsHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { t } = useLocaleResources('public-pages/landings/social-quests')

    return (
        <>
            <HeroSection
                title={t('SocialQuestsHero.title')}
                subtitle={t('SocialQuestsHero.subtitle')}
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
