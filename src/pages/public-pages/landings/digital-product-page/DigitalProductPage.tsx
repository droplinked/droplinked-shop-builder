import React from 'react'
import AboveTheFoldSection from '../parts/above-the-fold/AboveTheFoldSection'
import CustomizationDetails from '../parts/customization-details/CustomizationDetails'
import DualSideFlex from '../parts/dual-side-flex/DualSideFlex'
import Features from '../parts/features/Features'
import Layout from '../parts/layout/Layout'
import PaymentDetails from '../parts/payment-details/PaymentDetails'
import StarryBorder from '../parts/starry-border/StarryBorder'

function DigitalProductPage() {
    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/digitalProduct/nft.png"
                title="Minting and Monetizing Digital Assets with droplinked"
                description="Convert your physical and digital assets into exclusive NFTs, ready to dazzle collectors in your custom storefronts"
                CTAButtonText="Get Started"
            />
            <CustomizationDetails />
            <PaymentDetails />
            <DualSideFlex
                direction='rtl'
                image='assets/images/digitalProduct/create-nft.png'
                title='Creating your own NFTs'
                description='Convert your art, document, sounds and videos into NFTs and sell in your Storefronts'
            />
            <DualSideFlex
                direction='ltr'
                image='assets/images/digitalProduct/chain-support.png'
                title='Supporting Multiple Chain'
                description='We support multiple blockchain networks to offer greater flexibility in creating your NFTs'
            />
            <DualSideFlex
                direction='rtl'
                image='assets/images/digitalProduct/delivery.png'
                title='Sending delivery Email'
                description='You can include a delivery message and original asset link for your customers upon purchase'
            />
            <Features />
            <StarryBorder
                title='Launch a Store Today'
                description='Launch your store with droplinked today. Simple setup, secure transactions and endless possibilities await your community.'
                CTAButtonText='Get Started'
            />
        </Layout>
    )
}

export default DigitalProductPage