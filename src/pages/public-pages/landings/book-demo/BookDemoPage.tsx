import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import { LazyLoad } from '../_shared/components/LazyLoad'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import BookDemoHero from './BookDemoHero'
import enLocale from 'locales/public-pages/landings/book-demo/en.json'
import arLocale from 'locales/public-pages/landings/book-demo/ar.json'

export function meta() {
    return [
        { title: 'Book Demo | Discover How Droplinked Fits Your Business Needs' },
        {
            name: 'description',
            content:
                'Discover how droplinked fit your business needs. Schedule a personalized demo to see how our Web3 commerce platform can transform your business.',
        },
        {
            name: 'keywords',
            content:
                'book demo, droplinked demo, Web3 commerce demo, business consultation, platform demo, e-commerce solution',
        },
        {
            property: 'og:title',
            content: 'Book Demo | Discover How Droplinked Fits Your Business Needs',
        },
        {
            property: 'og:description',
            content:
                'Discover how droplinked fit your business needs. Schedule a personalized demo to see how our Web3 commerce platform can transform your business.',
        },
    ]
}

function BookDemoPage() {
    useLocaleResources('book-demo', { en: enLocale, ar: arLocale })

    const sections = [
        { id: 'partner-list', component: <MarqueeSection /> },
        { id: 'join-community', component: <JoinCommunity /> },
        { id: 'sign-up-cta', component: <SignUpCta /> }
    ]

    return (
        <>
            <BookDemoHero />
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

export default BookDemoPage