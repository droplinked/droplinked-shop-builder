import React from 'react'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import JoinCommunity from '../_shared/components/JoinCommunity'
import SignUpCta from '../_shared/components/SignUpCta'
import DIMSTHero from './DIMSTHero'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import { LazyLoad } from '../_shared/components/LazyLoad'

export default function DIMST() {
    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> },
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
