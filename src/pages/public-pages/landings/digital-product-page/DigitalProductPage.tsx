import { useDisclosure } from '@chakra-ui/react'
import AuthModal from 'components/modals/auth-modal/AuthModal'
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage'
import React from 'react'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import Features from '../_components/features/Features'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'

const DigitalProductPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                CTAButtonText="Get Started"
                CTAButtonFunction={onOpen}
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
                buttonFunctionality={onOpen}
            />
            {isOpen && <AuthModal show={isOpen} type={MODAL_TYPE.SIGNUP} close={onClose} />}
        </Layout>
    )
}

export default DigitalProductPage