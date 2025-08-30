import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/tokenizing-products/ar.json'
import enLocale from 'locales/public-pages/landings/tokenizing-products/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import TokenizingProductsFeatures from './TokenizingProductsFeatures'
import TokenizingProductsHero from './TokenizingProductsHero'
import TokenizingProductsModularStack from './TokenizingProductsModularStack'

export function meta() {
    return [
        { title: "Tokenize Inventory & Unlock Onchain Liquidity | Droplinked" },
        {
            name: "description",
            content: "Turn your inventory into tradable onchain assets with Droplinked. Our platform simplifies product tokenization for secure ownership, global liquidity, and secondary sales.",
        },
        {
            name: "keywords",
            content: "Product Tokenization, Tokenize Inventory, Asset Tokenization Platform, Onchain Asset Management",
        },
        {
            property: "og:title",
            content: "Tokenize Inventory & Unlock Onchain Liquidity | Droplinked",
        },
        {
            property: "og:description",
            content: "Turn your inventory into tradable onchain assets with Droplinked. Our platform simplifies product tokenization for secure ownership, global liquidity, and secondary sales.",
        },
    ];
}

function TokenizingProductsPage() {
    useLocaleResources('public-pages/landings/tokenizing-products', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <TokenizingProductsFeatures /> },
        { id: 'modular-stacks', component: <TokenizingProductsModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> },
    ]

    return (
        <>
            <TokenizingProductsHero />
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

export default TokenizingProductsPage