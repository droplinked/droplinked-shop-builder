import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/digital-goods/ar.json'
import enLocale from 'locales/public-pages/landings/digital-goods/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import DigitalGoodsFeatures from './DigitalGoodsFeatures'
import DigitalGoodsHero from './DigitalGoodsHero'
import DigitalGoodsModularStack from './DigitalGoodsModularStack'

function DigitalGoodsPage() {
    useLocaleResources('public-pages/landings/digital-goods', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <DigitalGoodsFeatures /> },
        { id: 'modular-stack', component: <DigitalGoodsModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <DigitalGoodsHero />
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

export default DigitalGoodsPage