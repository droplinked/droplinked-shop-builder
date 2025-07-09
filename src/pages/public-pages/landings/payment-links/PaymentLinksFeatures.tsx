import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { WalletLg } from 'assets/icons/Finance/Wallet/WalletLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function PaymentLinksFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <LinkLg color="#fff" />,
            title: "Instant Payment Links",
            description: "Share URLs or QR codes to enable fast purchases for items or invoices within just a few clicks",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Customizable Payment Pages",
            description: "Create payment pages align with your look, and choose between dark and light modes while customizing product details to display",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <WalletLg color="#fff" />,
            title: "Crypto and Fiat Payments",
            description: "Offer customers flexible payment options with a wide range of cryptocurrencies alongside traditional payment methods",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Sell Effortlessly with Full Flexibility'
            headingSubtitle='Generate payment links in seconds to sell anywhere without customers needing to visit a particular site, marketplace or application'
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            />
        </SectionContainer>
    )
}

export default PaymentLinksFeatures