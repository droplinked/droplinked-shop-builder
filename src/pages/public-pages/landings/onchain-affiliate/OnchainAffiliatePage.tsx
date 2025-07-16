import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/onchain-affiliate/ar.json'
import enLocale from 'locales/public-pages/landings/onchain-affiliate/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import OnchainAffiliateFeatures from './OnchainAffiliateFeatures'
import OnchainAffiliateHero from './OnchainAffiliateHero'
import OnchainAffiliateModularStack from './OnchainAffiliateModularStack'

function OnchainAffiliatePage() {
    useLocaleResources('public-pages/landings/onchain-affiliate', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partners', component: <MarqueeSection /> },
        { id: 'feature-list', component: <OnchainAffiliateFeatures /> },
        { id: 'modular-stack', component: <OnchainAffiliateModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <OnchainAffiliateHero />
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

export default OnchainAffiliatePage