import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/onchain-subscriptions/ar.json'
import enLocale from 'locales/public-pages/landings/onchain-subscriptions/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import OnchainSubscriptionsFeatures from './OnchainSubscriptionsFeatures'
import OnchainSubscriptionsHero from './OnchainSubscriptionsHero'
import OnchainSubscriptionsModularStack from './OnchainSubscriptionsModularStack'

function OnchainSubscriptionsPage() {
    useLocaleResources('public-pages/landings/onchain-subscriptions', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'set-of-features', component: <OnchainSubscriptionsFeatures /> },
        { id: 'modular-stacks', component: <OnchainSubscriptionsModularStack /> },
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

export default OnchainSubscriptionsPage