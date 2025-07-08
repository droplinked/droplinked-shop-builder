import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import TokenizingFeatures from './TokenizingFeatures'
import TokenizingModularStack from './TokenizingModularStack'
import TokenizingProductHero from './TokenizingProductHero'

export default function TokenizingProducts() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-features', component: <TokenizingFeatures /> },
        { id: 'modular-stacks', component: <TokenizingModularStack /> },
        { id: 'join-the-community', component: <JoinCommunity /> },
        { id: 'join-now', component: <SignUpCta /> },
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
