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
        { title: "TokenPay | Web3 Payment Gateway | Droplinked" },
        {
            name: "description",
            content: "Power your sales with TokenPay, Droplinked's secure Web3 payment gateway. Accept crypto payments and settle transactions on-chain.",
        },
        {
            name: "keywords",
            content: "TokenPay, Web3 payments, crypto checkout, blockchain payment gateway, secure crypto payments, decentralized finance",
        },
        {
            property: "og:title",
            content: "TokenPay | Web3 Payment Gateway | Droplinked",
        },
        {
            property: "og:description",
            content: "Power your sales with TokenPay, Droplinked's secure Web3 payment gateway. Accept crypto payments and settle transactions on-chain.",
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