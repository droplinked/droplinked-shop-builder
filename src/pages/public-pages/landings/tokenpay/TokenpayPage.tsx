import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/tokenpay/ar.json'
import enLocale from 'locales/public-pages/landings/tokenpay/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'

export function meta() {
    return [
        { title: "Accept Custom Token Payments | ERC20, BRC20 & SPL | Droplinked" },
        {
            name: "description",
            content: "Unlock token-powered commerce with TokenPay by Droplinked. Seamlessly accept any ERC20, BRC20, and SPL token to give real-world utility to digital assets.",
        },
        {
            name: "keywords",
            content: "Accept Custom Tokens, ERC20 Payments, Token Payment Gateway, Web3 E-commerce Payments",
        },
        {
            property: "og:title",
            content: "Accept Custom Token Payments | ERC20, BRC20 & SPL | Droplinked",
        },
        {
            property: "og:description",
            content: "Unlock token-powered commerce with TokenPay by Droplinked. Seamlessly accept any ERC20, BRC20, and SPL token to give real-world utility to digital assets.",
        },
    ];
}

function TokenpayPage() {
    useLocaleResources('public-pages/landings/tokenpay', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> },
    ]

    return (
        <>
            {/* TokenPay Hero Component would go here */}
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

export default TokenpayPage