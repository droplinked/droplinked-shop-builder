import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from "locales/public-pages/landings/homePage/ar.json"
import enLocale from "locales/public-pages/landings/homePage/en.json"
import React from 'react'
import JoinCommunity from '../_shared/components/JoinCommunity'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import SignUpCta from '../_shared/components/SignUpCta'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import KeyFeatures from './components/key-features/KeyFeatures'
import Testmonials from './components/testmonials/Testmonials'
import useHomePageLogic from './hooks/useHomePageLogic'

export function meta() {
  return [
    { title: "Home Page" },
    {
      property: "og:title",
      content: "Droplinked Home Page",
    },
    {
      name: "description",
      content: "Droplinked Home Page Description",
    },
  ];
}


export default function HomePage() {
  useLocaleResources('homePage', { en: enLocale, ar: arLocale })
  useHomePageLogic()

  return (
    <>
      <HomePageHero />
      <MaxWidthWrapper>
        <MarqueeSection />
        <GoLiveSection />
        <ProductOfferingSection />
        <KeyFeatures />
        <Testmonials />
        <JoinCommunity />
        <SignUpCta />
      </MaxWidthWrapper>
    </>
  )
}