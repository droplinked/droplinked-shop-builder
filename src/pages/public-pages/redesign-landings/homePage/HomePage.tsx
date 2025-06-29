import React from 'react'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import { LazyLoad } from '../_shared/components/LazyLoad'
import KeyFeatures from './components/key-features/KeyFeatures'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import JoinNow from './components/JoinNow'

export default function HomePage() {
  // const sections = [
  //   { id: 'partners-section', component: },
  //   { id: 'goLive-section', component:  },
  //   { id: 'product-offering-section', component:  },
  //   { id: 'key-features', component: },
  //   { id: 'join-the-community', component: <JoinTheCommuity /> },
  //   { id: 'join-now', component: <JoinNow /> },
  // ]

  return (
    <>
      <HomePageHero />
      <MaxWidthWrapper>
        <MarqueeSection />
        <GoLiveSection />
        <ProductOfferingSection />
        <KeyFeatures />
        <JoinTheCommuity />
        <JoinNow />

        {/* {sections.map((section) => (
          <LazyLoad key={section.id}>
            {section.component}
          </LazyLoad>
        ))} */}
      </MaxWidthWrapper>
    </>
  )
}