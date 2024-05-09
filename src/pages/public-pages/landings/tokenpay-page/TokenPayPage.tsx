import React from "react"
import AboveTheFoldSection from "../parts/above-the-fold/AboveTheFoldSection"
import Layout from "../parts/layout/Layout"
import StarryBorder from "../parts/starry-border/StarryBorder"
import Details from "./parts/_components/Details"
import Features from "./parts/features/Features"
import Gallery from "./parts/gallery/Gallery"
import PricingPlans from "./parts/pricing-plans/PricingPlans"
import { useDisclosure } from "@chakra-ui/react"
import AuthModal from "components/modals/auth-modal/AuthModal"
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage"

function TokenPayPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Layout>
      <AboveTheFoldSection
        image="assets/images/tokenPayPage/token-pay-bear.png"
        title="Token Powered Commerce Driven by Your Community"
        description="Leverage Tokenpay with any erc20, brc20 and SPL tokens to unlock real utility for communities."
        CTAButtonText="Get Started"
        CTAButtonFunction={onOpen}
      />
      <Details title="Crypto Commerce" description="Unlock innovative features at unparalleled value. Pricing plans are designed to elevate the commerce experience by providing powerful on-chain tools to elevate a tokens utility and projects success." />
      <Features />
      <Gallery />
      <Details title="Empower Communities" description="Unlock market-changing features at unparalleled value. Our pricing plans are designed to revolutionize your commerce experience, providing powerful tools to elevate your token's utility and your shop's success." />
      <PricingPlans />
      <StarryBorder onOpen={onOpen}/>
      {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} close={onClose} />}
    </Layout>
  )
}

export default TokenPayPage
