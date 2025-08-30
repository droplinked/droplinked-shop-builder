import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import arLocale from "locales/public-pages/landings/homePage/ar.json";
import enLocale from "locales/public-pages/landings/homePage/en.json";
import React from "react";
import JoinCommunity from "../_shared/components/JoinCommunity";
import MaxWidthWrapper from "../_shared/components/MaxWidthWrapper";
import SignUpCta from "../_shared/components/SignUpCta";
import MarqueeSection from "../_shared/components/marquee-wrapper/MarqueeSection";
import HomePageHero from "./components/HeroSection";
import ProductOfferingSection from "./components/ProductOfferingSection";
import GoLiveSection from "./components/go-live-section/GoLiveSection";
import KeyFeatures from "./components/key-features/KeyFeatures";
import Testmonials from "./components/testmonials/Testmonials";
import useHomePageLogic from "./hooks/useHomePageLogic";
import JsonLdScript from "components/common/JsonLdScript/JsonLdScript";
import { createHomePageSchema } from "utils/jsonLdSchemas";

export function meta() {
  return [
    { title: "Droplinked | Onchain Commerce Platform" },
    {
      name: "description",
      content:
        "Discover Droplinked, the leading onchain commerce platform with agentic commerce. Sell goods, tokenize inventory, and manage affiliates transparently to maximize business earnings.",
    },
    {
      name: "keywords",
      content:
        "Onchain Commerce, Digital Goods, Agentic Commerce Tools, Onchain Affiliate",
    },
    {
      property: "og:title",
      content: "Droplinked | Onchain Commerce Platform",
    },
    {
      property: "og:description",
      content:
        "Discover Droplinked, the leading onchain commerce platform with agentic commerce. Sell goods, tokenize inventory, and manage affiliates transparently to maximize business earnings.",
    },
  ];
}

export default function HomePage() {
  useLocaleResources("homePage", { en: enLocale, ar: arLocale });
  useHomePageLogic();

  return (
    <>
      <JsonLdScript data={createHomePageSchema()} />
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
  );
}