import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function OnchainAffiliateFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <SocialmediaLg color="#fff" />,
            title: "Automated Distributions",
            description: "Earnings and commissions are processed and distributed automatically, eliminating the legacy processes and manual steps typically used on merchant networks today",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: "Transparent Transactions",
            description: "Leverage the power of blockchain technology to ensure full transparency. All transactions are recorded on-chain, providing tamper-proof operations for both brands and co-sellers",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <TransferLg color="#fff" />,
            title: "Direct Settlements",
            description: "Enjoy instant, direct payouts on each sale. Whitelisted co-sellers receive commissions immediately without any intermediaries so that you can pay them the most",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Tracking Production to Point of Sale'
            headingSubtitle={`Earn or distribute affiliate commissions with smart rule based logic, \n minimizing fraud and automating payouts between parties based on contract terms`}
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

export default OnchainAffiliateFeatures