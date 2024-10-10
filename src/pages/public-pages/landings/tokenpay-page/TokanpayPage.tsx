import { Image, useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'
import React from 'react'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import Details from '../_components/details/Details'
import Layout from '../_components/layout/Layout'
import StarryBorder from '../_components/starry-border/StarryBorder'
import PricingPlans from './_components/pricing-plans/PricingPlans'
import TokenpayFeatures from './_components/TokenpayFeatures'

function TokanpayPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Layout>
            <AboveTheFoldSection
                image="https://upload-file-droplinked.s3.amazonaws.com/265336fb6702384264635267b4d490a66e93627ec6c646aaa9769e740229169c.png"
                title="Token Powered Commerce Driven by Your Community"
                description="Leverage Tokenpay with any erc20, brc20 and SPL tokens to unlock real utility for communities."
                CTAButtonText="Get Started"
                CTAButtonFunction={onOpen}
            />

            <Details
                title="Crypto Commerce"
                description="Unlock innovative features at unparalleled value. Pricing plans are designed to elevate the commerce experience by providing powerful onchain tools to elevate a tokens utility and projects success."
            />

            <TokenpayFeatures />

            <Image src="https://upload-file-droplinked.s3.amazonaws.com/f69bc2b8d23993287248a4d13ce91596c34c6d4b910471fdf81bb676e0c5d3e5.png" />

            <Details
                title="Empower Communities"
                description="Unlock market-changing features at unparalleled value. Our pricing plans are designed to revolutionize your commerce experience, providing powerful tools to elevate your token's utility and your shop's success."
            />

            <PricingPlans />

            <StarryBorder
                title='Launch a Store Today'
                description='Simple setup, secure transactions and endless possibilities await your community.'
                buttonText='Get Started'
                buttonFunctionality={onOpen}
            />
            {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} close={onClose} />}
        </Layout>
    )
}

export default TokanpayPage