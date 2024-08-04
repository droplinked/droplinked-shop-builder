import React from 'react'
import AboveTheFoldSection from '../parts/above-the-fold/AboveTheFoldSection'
import CustomizationDetails from '../parts/customization-details/CustomizationDetails'
import DualSideFlex from '../parts/dual-side-flex/DualSideFlex'
import Features from '../parts/features/Features'
import Layout from '../parts/layout/Layout'
import PaymentDetails from '../parts/payment-details/PaymentDetails'
import StarryBorder from '../parts/starry-border/StarryBorder'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { useDisclosure } from '@chakra-ui/react'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'

function DigitalProductPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/digitalProduct/nft.png"
                title="Minting and Monetizing Assets"
                description="Convert digital assets into exclusive collectibles that work seamlessly with a storefront to engage the community"
                CTAButtonText="Get Started"
                CTAButtonFunction={onOpen}
            />
            <CustomizationDetails />
            <PaymentDetails />
            <DualSideFlex
                direction='rtl'
                image='assets/images/digitalProduct/create-nft.png'
                title='Mint NFTs'
                description='Convert art pieces, documents, audio, video and ticketing into on-chain records'
            />
            <DualSideFlex
                direction='ltr'
                image='assets/images/digitalProduct/chain-support.png'
                title='Multi-Chain Integration'
                description='Supporting multiple blockchain networks to offer greater flexibility'
            />
            <DualSideFlex
                direction='rtl'
                image='assets/images/digitalProduct/royalty.png'
                title='Loyalty and Royalty Programs '
                description='Maximize earnings and rewards with co-selling and reselling'
            />
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

export default DigitalProductPage