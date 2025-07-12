import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import PaymentLinksFeatures from './PaymentLinksFeatures'
import PaymentLinksHero from './PaymentLinksHero'
import PaymentLinksModularStack from './PaymentLinksModularStack'

export default function PaymentLinksPage() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'feature-list', component: <PaymentLinksFeatures /> },
        { id: 'modular-stack', component: <PaymentLinksModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <PaymentLinksHero />
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
