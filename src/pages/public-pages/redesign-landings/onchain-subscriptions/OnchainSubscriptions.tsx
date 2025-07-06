import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import ModularStack from './components/ModularStack'
import OnchainSubscriptionsHero from './components/OnchainSubscriptionsHero'
import SetOfFeatures from './components/SetOfFeatures'

export default function OnchainSubscriptions() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-features', component: <SetOfFeatures /> },
        { id: 'modular-stacks', component: <ModularStack /> },
        { id: 'join-the-community', component: <JoinCommunity /> },
        { id: 'join-now', component: <SignUpCta /> },
    ]

    return (
        <>
            <OnchainSubscriptionsHero />
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
