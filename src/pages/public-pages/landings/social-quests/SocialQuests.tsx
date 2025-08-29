import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/public-pages/landings/social-quests/ar.json'
import enLocale from 'locales/public-pages/landings/social-quests/en.json'
import React from 'react'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import SocialQuestsHero from './SocialQuestsHero'
import SocialQuestsModularStack from './SocialQuestsModularStack'

export function meta() {
    return [
        { title: "Web3 Rewards & Loyalty Programs | Droplinked" },
        {
            name: "description",
            content: "Boost customer engagement and retention with a Web3-powered rewards program. Offer tokenized rewards and build a loyal community with Droplinked.",
        },
        {
            name: "keywords",
            content: "rewards program, loyalty program, customer rewards, token rewards, engagement, incentives, Web3 loyalty",
        },
        {
            property: "og:title",
            content: "Web3 Rewards & Loyalty Programs | Droplinked",
        },
        {
            property: "og:description",
            content: "Boost customer engagement and retention with a Web3-powered rewards program. Offer tokenized rewards and build a loyal community with Droplinked.",
        },
    ];
}

export default function SocialQuests() {
    useLocaleResources("public-pages/landings/social-quests", { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'modular-stacks', component: <SocialQuestsModularStack /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <SocialQuestsHero />
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
