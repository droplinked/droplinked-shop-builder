import React from 'react'
import AboveTheFoldSection from '../parts/above-the-fold/AboveTheFoldSection'
import CustomizationDetails from '../parts/customization-details/CustomizationDetails'
import DualSideFlex from '../parts/dual-side-flex/DualSideFlex'
import Features from '../parts/features/Features'
import Layout from '../parts/layout/Layout'
import PaymentDetails from '../parts/payment-details/PaymentDetails'
import StarryBorder from '../parts/starry-border/StarryBorder'
import { useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'

function PODProductPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/podProduct/pod-lion.png"
                title="Transform Artwork and IP into Premium Merchandise"
                description="With droplinked you can create and sell customizable on-demand products with no inventory and shipment hassles"
                CTAButtonText="Get Started"
                CTAButtonFunction={onOpen}
            />
            <CustomizationDetails />
            <PaymentDetails />
            <DualSideFlex
                direction='rtl'
                image='assets/images/podProduct/customize.png'
                title='More than +10K Items to Customize'
                description='Explore high quality merchandise blanks customizable and ready to sell on-demand'
            />
            <DualSideFlex
                direction='ltr'
                image='assets/images/podProduct/easy-customization.png'
                title='Admin Console to Design, Publish and Track Performance'
                description='Quickly design your favorite products with our free design tool'
            />
            <DualSideFlex
                direction='rtl'
                image='assets/images/podProduct/automated-shipping.png'
                title='Automated Shipping and Fulfillment'
                description='Hassle-free shipping and fulfillment, everything is handled on your behalf'
            />
            <DualSideFlex
                direction='ltr'
                image='assets/images/podProduct/mint-to-merch.png'
                title='Mint to Merch'
                description='Empower community members to design merchandise with exclusive designs or NFT artwork they own'
            />
            <Features />
            <StarryBorder onOpen={onOpen} />
            {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} close={onClose} />}
        </Layout>
    )
}

export default PODProductPage