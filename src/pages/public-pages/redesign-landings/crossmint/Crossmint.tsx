import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import ModularStack from './components/ModularStack'
import SetOfPerks from './components/SetOfPerks'
import CrossmintHero from './components/crossmint-hero/CrossmintHero'
import ClaimNow from './components/ClaimNow'
import localEn from 'locales/public-pages/redesign-landings/crossmint/en.json'
import localAr from 'locales/public-pages/redesign-landings/crossmint/ar.json'

export default function Crossmint() {
    const { t } = useLocaleResources('public-pages/redesign-landings/crossmint', { en: localEn, ar: localAr })

    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-perks', component: <SetOfPerks t={t} /> },
        { id: 'modular-stack', component: <ModularStack t={t} /> },
        { id: 'join-the-community', component: <JoinTheCommuity /> },
        { id: 'claim-now', component: <ClaimNow t={t} /> },
    ]

    return (
        <>
            <CrossmintHero t={t} />
            <MaxWidthWrapper>
                {sections.map((section) => (
                    <LazyLoad key={section.id}>
                        {section.component}
                    </LazyLoad>
                ))}
            </MaxWidthWrapper>
        </>
    )
}
