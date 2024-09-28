import React from 'react'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import CustomizationDetails from '../_components/customization-details/CustomizationDetails'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import Features from '../_components/features/Features'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'
import { useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'

const PODProductPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dualSideFlexData = [
        {
            image: 'assets/images/podProduct/customize.png',
            title: 'More than +10K Items to Customize',
            description: 'Explore high quality merchandise blanks customizable and ready to sell on-demand',
        },
        {
            image: 'assets/images/podProduct/easy-customization.png',
            title: 'Admin Console to Design, Publish and Track Performance',
            description: 'Quickly design your favorite products with our free design tool',
        },
        {
            image: 'assets/images/podProduct/automated-shipping.png',
            title: 'Automated Shipping and Fulfillment',
            description: 'Hassle-free shipping and fulfillment, everything is handled on your behalf',
        },
        {
            image: 'assets/images/podProduct/mint-to-merch.png',
            title: 'Mint to Merch',
            description: 'Empower community members to design merchandise with exclusive designs or NFT artwork they own',
        },
    ]

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
            {dualSideFlexData.map((item, index) => (
                <DualSideFlex
                    key={index}
                    direction={index % 2 === 0 ? 'rtl' : 'ltr'}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                />
            ))}
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

export default PODProductPage