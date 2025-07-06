import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import JoinNow from './components/JoinNow'
import ModularStack from './components/ModularStack'
import SetOfFeatures from './components/SetOfFeatures'
import TokenizingProductHero from './components/TokenizingProductHero'

export default function TokenizingProducts() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-features', component: <SetOfFeatures /> },
        { id: 'modular-stacks', component: <ModularStack /> },
        { id: 'join-the-community', component: <JoinCommunity /> },
        { id: 'join-now', component: <JoinNow /> },
    ]

    return (
        <>
            <TokenizingProductHero />
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
