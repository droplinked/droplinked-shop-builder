import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import ProductsOnDemandFeatures from './ProductsOnDemandFeatures'
import ProductsOnDemandHero from './ProductsOnDemandHero'
import ProductsOnDemandModularStack from './ProductsOnDemandModularStack'

function ProductsOnDemandPage() {
    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
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