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
                image="assets/images/physicalProduct/physical-product.png"
                title="Monetize Your Inventory with Tailored Storefronts"
                description="With a comprehensive storefront and on-chain inventory management system, maximize sales of your physical items. Leverage tokenization and product minting to gain a competitive edge."
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