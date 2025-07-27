import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/custom-tokens/ar.json'
import enLocale from 'locales/public-pages/landings/custom-tokens/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import CustomTokensFeatures from './CustomTokensFeatures'
import CustomTokensHero from './CustomTokensHero'
import CustomTokensModularStack from './CustomTokensModularStack'

function CustomTokensPage() {
    useLocaleResources('public-pages/landings/custom-tokens', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <CustomTokensFeatures /> },
        { id: 'modular-stack', component: <CustomTokensModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <CustomTokensHero />
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

export default CustomTokensPage