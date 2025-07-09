import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import TokenpayFeatures from './TokenpayFeatures'
import TokenpayHero from './TokenpayHero'
import TokenpayModularStack from './TokenpayModularStack'

function TokenpayPage() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'feature-list', component: <TokenpayFeatures /> },
        { id: 'modular-stack', component: <TokenpayModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <TokenpayHero />
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

export default TokenpayPage