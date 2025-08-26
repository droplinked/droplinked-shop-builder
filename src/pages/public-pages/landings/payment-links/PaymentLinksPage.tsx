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
        { title: "Multi-Network Payment Links | Droplinked" },
        {
            name: "description",
            content: "Create instant, customizable payment links to sell anywhere. Accept crypto across multiple blockchains or traditional fiat payments seamlessly.",
        },
        {
            name: "keywords",
            content: "payment links, crypto payments, fiat payments, Stripe, multi-network, sell anywhere, instant payments",
        },
        {
            property: "og:title",
            content: "Multi-Network Payment Links | Droplinked",
        },
        {
            property: "og:description",
            content: "Create instant, customizable payment links to sell anywhere. Accept crypto across multiple blockchains or traditional fiat payments seamlessly.",
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
