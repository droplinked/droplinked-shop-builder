import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import QuestWindow from './quests/QuestWindow'
import localEn from 'locales/public-pages/landings/social-quests/en.json'
import localAr from 'locales/public-pages/landings/social-quests/ar.json'

export default function SocialQuestsHero() {
    const { t } = useLocaleResources('public-pages/landings/social-quests', {
        en: localEn,
        ar: localAr
    })
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <>
            <HeroSection
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
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
