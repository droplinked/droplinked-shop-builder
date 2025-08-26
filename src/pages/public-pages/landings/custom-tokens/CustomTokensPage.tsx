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

export function meta() {
    return [
        { title: "Create Custom Tokens | Droplinked" },
        {
            name: "description",
            content: "Design and launch your own custom-branded utility tokens with Droplinked's no-code tools. Build your brand on the blockchain.",
        },
        {
            name: "keywords",
            content: "custom tokens, branded tokens, utility tokens, token creation, blockchain branding, no-code tokens",
        },
        {
            property: "og:title",
            content: "Create Custom Tokens | Droplinked",
        },
        {
            property: "og:description",
            content: "Design and launch your own custom-branded utility tokens with Droplinked's no-code tools. Build your brand on the blockchain.",
        },
    ];
}

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