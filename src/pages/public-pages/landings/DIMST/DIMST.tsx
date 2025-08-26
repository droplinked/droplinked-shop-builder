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
        { title: "Product Record ROI Calculator | Droplinked" },
        {
            name: "description",
            content: "Use the Droplinked Product Record Calculator to project the ROI of using onchain inventory. Analyze costs, revenue, and profitability for your business.",
        },
        {
            name: "keywords",
            content: "ROI calculator, return on investment, financial planning, cost-benefit analysis, inventory management ROI, sales projection",
        },
        {
            property: "og:title",
            content: "Product Record ROI Calculator | Droplinked",
        },
        {
            property: "og:description",
            content: "Use the Droplinked Product Record Calculator to project the ROI of using onchain inventory. Analyze costs, revenue, and profitability for your business.",
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
