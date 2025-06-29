import React from 'react'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import ModularStack from './components/ModularStack'
import SetOfPerks from './components/SetOfPerks'
import CrossmintHero from './components/crossmint-hero/CrossmintHero'
import ClaimNow from './components/ClaimNow'

export default function Crossmint() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-perks', component: <SetOfPerks /> },
        { id: 'modular-stack', component: <ModularStack /> },
        { id: 'join-the-community', component: <JoinTheCommuity /> },
        { id: 'claim-now', component: <ClaimNow /> },
    ]

    return (
        <>
            <CrossmintHero />
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
