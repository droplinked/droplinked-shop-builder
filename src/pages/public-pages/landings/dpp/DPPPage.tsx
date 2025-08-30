import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/dpp/ar.json'
import enLocale from 'locales/public-pages/landings/dpp/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import DPPFeatures from './DPPFeatures'
import DPPHero from './DPPHero'
import DPPModularStack from './DPPModularStack'

export function meta() {
    return [
        { title: "Onchain Digital Product Passports (DPP) | Droplinked" },
        {
            name: "description",
            content: "Use Droplinked's onchain Digital Product Passport (DPP) for complete product lifecycle management. Enhance traceability, ensure compliance, and prevent counterfeiting.",
        },
        {
            name: "keywords",
            content: "Digital Product Passport, Onchain Supply Chain, Product Lifecycle Management, Blockchain Traceability",
        },
        {
            property: "og:title",
            content: "Onchain Digital Product Passports (DPP) | Droplinked",
        },
        {
            property: "og:description",
            content: "Use Droplinked's onchain Digital Product Passport (DPP) for complete product lifecycle management. Enhance traceability, ensure compliance, and prevent counterfeiting.",
        },
    ];
}

function DPPPage() {
    useLocaleResources('public-pages/landings/dpp', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <DPPFeatures /> },
        { id: 'modular-stack', component: <DPPModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> },
    ]

    return (
        <>
            <DPPHero />
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

export default DPPPage