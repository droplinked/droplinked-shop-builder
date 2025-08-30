import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/payment-links/ar.json'
import enLocale from 'locales/public-pages/landings/payment-links/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import PaymentLinksFeatures from './PaymentLinksFeatures'
import PaymentLinksHero from './PaymentLinksHero'
import PaymentLinksModularStack from './PaymentLinksModularStack'

export function meta() {
    return [
        { title: "Create Crypto & Fiat Payment Links | Shareable Checkout | Droplinked" },
        {
            name: "description",
            content: "Sell anywhere with Droplinked's payment links. Instantly create and share customizable payment pages via URL or QR code to accept crypto and traditional payments.",
        },
        {
            name: "keywords",
            content: "Crypto Payment Links, Shareable Payment Pages, Sell with Crypto, QR Code Payments",
        },
        {
            property: "og:title",
            content: "Create Crypto & Fiat Payment Links | Shareable Checkout | Droplinked",
        },
        {
            property: "og:description",
            content: "Sell anywhere with Droplinked's payment links. Instantly create and share customizable payment pages via URL or QR code to accept crypto and traditional payments.",
        },
    ];
}

export default function PaymentLinksPage() {
    useLocaleResources('public-pages/landings/payment-links', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
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
