import React from 'react'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import JoinCommunity from '../_shared/components/JoinCommunity'
import SignUpCta from '../_shared/components/SignUpCta'
import DIMSTHero from './DIMSTHero'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import { LazyLoad } from '../_shared/components/LazyLoad'

export default function DIMST() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'join-the-community', component: <JoinCommunity /> },
        { id: 'join-now', component: <SignUpCta /> },
    ]

    return (
        <>
            <DIMSTHero />
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
