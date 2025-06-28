import React from 'react'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import { LazyLoad } from '../_shared/components/LazyLoad'

export default function HomePage() {
  const sections = [
    { id: 'partners-section', component: <MarqueeSection /> },
    // { id: 'goLive-section', component: <GoLiveSection /> },
    { id: 'product-offering-section', component: <ProductOfferingSection /> }
  ]

  return (
    <>
      <HomePageHero />
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