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
        { title: "Droplinked Rewards | Complete Quests to Earn a Free Pro Plan" },
        {
            name: "description",
            content: "Join Droplinked quests and level up your account! Complete simple tasks to earn points, unlock credits, and get a free Pro Plan to start your onchain commerce journey.",
        },
        {
            name: "keywords",
            content: "Droplinked Rewards, Customer Loyalty Program, Earn Free Subscription, Social Media Quests",
        },
        {
            property: "og:title",
            content: "Droplinked Rewards | Complete Quests to Earn a Free Pro Plan",
        },
        {
            property: "og:description",
            content: "Join Droplinked quests and level up your account! Complete simple tasks to earn points, unlock credits, and get a free Pro Plan to start your onchain commerce journey.",
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
