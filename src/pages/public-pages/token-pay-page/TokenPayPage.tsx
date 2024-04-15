import { Flex } from "@chakra-ui/react"
import React from "react"
import Details from "./parts/_components/Details"
import AboveTheFoldSection from "./parts/above-the-fold/AboveTheFoldSection"
import Features from "./parts/features/Features"
import Gallery from "./parts/gallery/Gallery"
import LaunchShop from "./parts/launch-shop/LaunchShop"
import PricingPlans from "./parts/pricing-plans/PricingPlans"

function TokenPayPage() {
  return (
    <Flex justifyContent={"center"}>
      <Flex direction="column" alignItems={"center"} gap={120} width={{ base: "100%", lg: "80%" }} maxWidth="1400px" paddingInline={{ base: "16px", sm: "28px" }} paddingBottom={120}>
        <AboveTheFoldSection />
        <Details title="Crypto Commerce" description="Unlock innovative features at unparalleled value. Pricing plans are designed to elevate the commerce experience by providing powerful on-chain tools to elevate a tokens utility and projects success." />
        <Features />
        <Gallery />
        <Details title="Empower Communities" description="Unlock market-changing features at unparalleled value. Our pricing plans are designed to revolutionize your commerce experience, providing powerful tools to elevate your token's utility and your shop's success." />
        <PricingPlans />
        <LaunchShop />
      </Flex>
    </Flex>
  )
}

export default TokenPayPage
