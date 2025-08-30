import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/products-on-demand/ar.json'
import enLocale from 'locales/public-pages/landings/products-on-demand/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import ProductsOnDemandFeatures from './ProductsOnDemandFeatures'
import ProductsOnDemandHero from './ProductsOnDemandHero'
import ProductsOnDemandModularStack from './ProductsOnDemandModularStack'

export function meta() {
    return [
        { title: "Print on Demand Merchandise | No Inventory Required | Droplinked" },
        {
            name: "description",
            content: "Create and sell custom merchandise on-demand with Droplinked. Turn your artwork, IP, or NFTs into premium products with no inventory or shipping hassles.",
        },
        {
            name: "keywords",
            content: "Print on Demand, Custom Merchandise, Sell Custom Products, Mint to Merch",
        },
        {
            property: "og:title",
            content: "Print on Demand Merchandise | No Inventory Required | Droplinked",
        },
        {
            property: "og:description",
            content: "Create and sell custom merchandise on-demand with Droplinked. Turn your artwork, IP, or NFTs into premium products with no inventory or shipping hassles.",
        },
    ];
}

function ProductsOnDemandPage() {
    useLocaleResources('public-pages/landings/products-on-demand', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <ProductsOnDemandFeatures /> },
        { id: 'modular-stack', component: <ProductsOnDemandModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <ProductsOnDemandHero />
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

export default ProductsOnDemandPage