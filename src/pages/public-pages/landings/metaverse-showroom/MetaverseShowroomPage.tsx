import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/metaverse-showroom/ar.json'
import enLocale from 'locales/public-pages/landings/metaverse-showroom/en.json'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import MetaverseShowroomFeatures from './MetaverseShowroomFeatures'
import MetaverseShowroomHero from './MetaverseShowroomHero'
import MetaverseShowroomModularStack from './MetaverseShowroomModularStack'

function MetaverseShowroomPage() {
    useLocaleResources('public-pages/landings/metaverse-showroom', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'feature-list', component: <MetaverseShowroomFeatures /> },
        { id: 'modular-stack', component: <MetaverseShowroomModularStack /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <MetaverseShowroomHero />
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

export default MetaverseShowroomPage