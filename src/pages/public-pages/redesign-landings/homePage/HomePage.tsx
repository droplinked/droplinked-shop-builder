import React from 'react'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import JoinNow from './components/JoinNow'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import KeyFeatures from './components/key-features/KeyFeatures'

export default function HomePage() {
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
      </MaxWidthWrapper>
    </>
  )
}