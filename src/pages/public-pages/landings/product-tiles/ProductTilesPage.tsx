import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/product-tiles/ar.json'
import enLocale from 'locales/public-pages/landings/product-tiles/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import ProductTilesFeatures from './ProductTilesFeatures'
import ProductTilesHero from './ProductTilesHero'
import ProductTilesModularStack from './ProductTilesModularStack'

export function meta() {
    return [
        { title: "Embeddable Product Tiles | Sell Anywhere | Droplinked" },
        {
            name: "description",
            content: "Add e-commerce to any website or blog with Droplinked's embeddable Product Tiles. Make your content instantly shoppable.",
        },
        {
            name: "keywords",
            content: "product tiles, embeddable products, shoppable content, product widget, e-commerce embed, sell on blog",
        },
        {
            property: "og:title",
            content: "Embeddable Product Tiles | Sell Anywhere | Droplinked",
        },
        {
            property: "og:description",
            content: "Add e-commerce to any website or blog with Droplinked's embeddable Product Tiles. Make your content instantly shoppable.",
        },
    ];
}

function ProductTilesPage() {
    useLocaleResources('public-pages/landings/product-tiles', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <ProductTilesFeatures /> },
        { id: 'modular-stack', component: <ProductTilesModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <ProductTilesHero />
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

export default ProductTilesPage