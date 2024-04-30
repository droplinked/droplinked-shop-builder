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
                title="Minting and Monetizing Assets"
                description="Convert digital assets into exclusive collectibles that work seamlessly with a storefront to engage the community"
                CTAButtonText="Get Started"
            />
            <CustomizationDetails />
            <PaymentDetails />
            <DualSideFlex
                direction='rtl'
                image='assets/images/digitalProduct/create-nft.png'
                title='Minting NFTs'
                description='Convert  art pieces, documents, audio, video and tickets into NFTs to offer within storefronts'
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
            <StarryBorder />
        </Layout>
    )
}

export default DigitalProductPage