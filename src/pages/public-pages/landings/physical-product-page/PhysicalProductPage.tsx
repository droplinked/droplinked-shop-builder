import React from 'react'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Features from '../_components/features/Features'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'
import TabularContent from './TabularContent'
import { useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'

function PhysicalProductPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Layout>
            <AboveTheFoldSection
                image="https://upload-file-droplinked.s3.amazonaws.com/43da5c3bee55cabbcbb7e470866a0f869b5e10862edb3cc3c1075d73885045dc.png"
                title="Monetize Inventory with Tailored Storefronts"
                description="Maximize sales value of inventory with a comprehensive storefront and onchain inventory management system. Leverage tokenization and product minting to gain deeper insights on your customer base and distribution"
                CTAButtonText="Get Started"
                CTAButtonFunction={onOpen}
            />

            <FrontModularity />

            <PaymentDetails />

            <TabularContent />

            <Features />

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

export default PhysicalProductPage