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

export function meta() {
    return [
        { title: "Onchain Subscription Management | Secure Payouts | Droplinked" },
        {
            name: "description",
            content: "Sell subscriptions confidently with Droplinked. Our onchain platform provides secure affiliate tracking to eliminate fraud and ensure automated commission payouts.",
        },
        {
            name: "keywords",
            content: "Onchain Subscriptions, SaaS Affiliate Tracking, Affiliate Fraud Prevention, Automated Commission Payouts",
        },
        {
            property: "og:title",
            content: "Onchain Subscription Management | Secure Payouts | Droplinked",
        },
        {
            property: "og:description",
            content: "Sell subscriptions confidently with Droplinked. Our onchain platform provides secure affiliate tracking to eliminate fraud and ensure automated commission payouts.",
        },
    ];
}

function OnchainSubscriptionsPage() {
    useLocaleResources('public-pages/landings/onchain-subscriptions', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <OnchainSubscriptionsFeatures /> },
        { id: 'modular-stacks', component: <OnchainSubscriptionsModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> },
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