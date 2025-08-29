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
        { title: "No-Code Tokenization & NFT Minting | Droplinked" },
        {
            name: "description",
            content: "Monetize your assets with Droplinked's no-code tools. Easily tokenize physical goods or mint NFTs for digital art, music, and more without any programming.",
        },
        {
            name: "keywords",
            content: "tokenization, NFT minting, no-code, monetize assets, create NFT, blockchain, digital assets, physical assets",
        },
        {
            property: "og:title",
            content: "No-Code Tokenization & NFT Minting | Droplinked",
        },
        {
            property: "og:description",
            content: "Monetize your assets with Droplinked's no-code tools. Easily tokenize physical goods or mint NFTs for digital art, music, and more without any programming.",
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