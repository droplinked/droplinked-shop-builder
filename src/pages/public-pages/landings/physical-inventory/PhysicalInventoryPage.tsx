import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/physical-inventory/ar.json'
import enLocale from 'locales/public-pages/landings/physical-inventory/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import PhysicalInventoryFeatures from './PhysicalInventoryFeatures'
import PhysicalInventoryHero from './PhysicalInventoryHero'
import PhysicalInventoryModularStack from './PhysicalInventoryModularStack'

export function meta() {
    return [
        { title: "AI-Powered Onchain Inventory Management | Droplinked" },
        {
            name: "description",
            content: "Digitize physical inventory onchain with Droplinked. Our AI assistant automates product creation and provides advanced analytics to streamline your entire operation.",
        },
        {
            name: "keywords",
            content: "Onchain Inventory Management, AI-Powered Commerce, RWA Tokenization, Automated Fulfillment",
        },
        {
            property: "og:title",
            content: "AI-Powered Onchain Inventory Management | Droplinked",
        },
        {
            property: "og:description",
            content: "Digitize physical inventory onchain with Droplinked. Our AI assistant automates product creation and provides advanced analytics to streamline your entire operation.",
        },
    ];
}

function PhysicalInventoryPage() {
    useLocaleResources('public-pages/landings/physical-inventory', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
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