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
    { title: "Droplinked: The No-Code Platform for Web3 & E-commerce" },
    {
      name: "description",
      content: "Droplinked provides a no-code platform for Web3 commerce, enabling businesses to tokenize products, manage onchain inventory, and sell digital or physical goods with ease.",
    },
    {
      name: "keywords",
      content: "Web3 commerce, e-commerce platform, no-code, tokenization, onchain inventory, digital product passport, NFT, blockchain, sell digital goods, sell physical goods",
    },
    {
      property: "og:title",
      content: "Droplinked: The No-Code Platform for Web3 & E-commerce",
    },
    {
      property: "og:description",
      content: "Droplinked provides a no-code platform for Web3 commerce, enabling businesses to tokenize products, manage onchain inventory, and sell digital or physical goods with ease.",
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