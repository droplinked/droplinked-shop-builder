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

export function meta() {
    return [
        { title: "Create a Metaverse Store | 3D Virtual Showrooms | Droplinked" },
        {
            name: "description",
            content: "Launch your metaverse store with Droplinked. Transform your inventory into interactive 3D virtual showrooms and offer customers immersive AR/VR shopping experiences.",
        },
        {
            name: "keywords",
            content: "Metaverse Store, Virtual Showroom, 3D Shopping Experience, Immersive Commerce",
        },
        {
            property: "og:title",
            content: "Create a Metaverse Store | 3D Virtual Showrooms | Droplinked",
        },
        {
            property: "og:description",
            content: "Launch your metaverse store with Droplinked. Transform your inventory into interactive 3D virtual showrooms and offer customers immersive AR/VR shopping experiences.",
        },
    ];
}

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