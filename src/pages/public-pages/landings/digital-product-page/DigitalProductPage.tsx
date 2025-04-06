import React from 'react'
import { useNavigate } from 'react-router-dom'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import Features from '../_components/features/Features'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'

const DigitalProductPage = () => {
    const navigate = useNavigate()

    const dualSideFlexData = [
        {
            image: 'assets/images/digitalProduct/create-nft.png',
            title: 'Mint NFTs',
            description: 'Convert art pieces, documents, audio, video, and ticketing into on-chain records',
        },
        {
            image: 'assets/images/digitalProduct/chain-support.png',
            title: 'Multi-Chain Integration',
            description: 'Supporting multiple blockchain networks to offer greater flexibility',
        },
        {
            image: 'assets/images/digitalProduct/royalty.png',
            title: 'Loyalty and Royalty Programs',
            description: 'Maximize earnings and rewards with co-selling and reselling',
        },
    ]

    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/digitalProduct/nft.png"
                title="Minting and Monetizing Assets"
                description="Convert digital assets into exclusive collectibles that work seamlessly with a storefront to engage the community"
            />

            <FrontModularity />

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
                onButtonClick={() => navigate('/onboarding?entry=signup')}
            />
        </Layout>
    )
}

export default DigitalProductPage