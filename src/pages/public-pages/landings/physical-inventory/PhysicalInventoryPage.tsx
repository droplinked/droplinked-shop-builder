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
        { title: "Tokenize Physical Inventory | Onchain Inventory Management | Droplinked" },
        {
            name: "description",
            content: "Bridge the gap between physical and digital. Tokenize your physical inventory for transparent, onchain management and proof of ownership.",
        },
        {
            name: "keywords",
            content: "physical inventory, tokenized stock, onchain inventory management, supply chain, logistics, phygital, asset tokenization",
        },
        {
            property: "og:title",
            content: "Tokenize Physical Inventory | Onchain Inventory Management | Droplinked",
        },
        {
            property: "og:description",
            content: "Bridge the gap between physical and digital. Tokenize your physical inventory for transparent, onchain management and proof of ownership.",
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