import React from 'react'
import AboveTheFoldSection from '../parts/above-the-fold/AboveTheFoldSection'
import CustomizationDetails from '../parts/customization-details/CustomizationDetails'
import Features from '../parts/features/Features'
import Layout from '../parts/layout/Layout'
import PaymentDetails from '../parts/payment-details/PaymentDetails'
import StarryBorder from '../parts/starry-border/StarryBorder'
import TabularContent from './parts/tabular-content/TabularContent'

function PhysicalProductPage() {
    return (
        <Layout>
            <AboveTheFoldSection
                image="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6130227ff2a466c5ee160b8e5e52953f9c8b249d7ca0a37b336a823bc63f00c7.png_or.png"
                title="Monetize Inventory with Tailored Storefronts"
                description="Maximize sales value of inventory with a comprehensive storefront and on-chain inventory management system. Leverage tokenization and product minting to gain deeper insights on your customer base and distribution"
                CTAButtonText="Get Started"
            />
            <CustomizationDetails />
            <PaymentDetails />
            <TabularContent />
            <Features />
            <StarryBorder />
        </Layout>
    )
}

export default PhysicalProductPage