import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/DIMST/ar.json'
import enLocale from 'locales/public-pages/landings/DIMST/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import DIMSTHero from './DIMSTHero'

export function meta() {
    return [
        { title: "Enterprise Inventory ROI Calculator | Droplinked" },
        {
            name: "description",
            content: "Project your ROI with Droplinked. Our calculator analyzes the financial benefits of our onchain inventory management for both primary and secondary sales.",
        },
        {
            name: "keywords",
            content: "ROI Calculator, Enterprise ROI, Inventory Management ROI, GMV Projection",
        },
        {
            property: "og:title",
            content: "Enterprise Inventory ROI Calculator | Droplinked",
        },
        {
            property: "og:description",
            content: "Project your ROI with Droplinked. Our calculator analyzes the financial benefits of our onchain inventory management for both primary and secondary sales.",
        },
    ];
}

export default function DIMST() {
    useLocaleResources('public-pages/landings/DIMST', { en: enLocale, ar: arLocale })

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
