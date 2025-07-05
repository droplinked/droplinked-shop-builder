import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import PhysicalInventoryFeatures from './PhysicalInventoryFeatures'
import PhysicalInventoryHero from './PhysicalInventoryHero'
import PhysicalInventoryModularStack from './PhysicalInventoryModularStack'

function PhysicalInventoryPage() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'feature-list', component: <PhysicalInventoryFeatures /> },
        { id: 'modular-stack', component: <PhysicalInventoryModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <PhysicalInventoryHero />
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

export default PhysicalInventoryPage