import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { RocketLg } from 'assets/icons/Action/Rocket/RocketLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'

function CustomTokensFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <CoinsLg color="#fff" />,
            title: "Token-Powered Transactions",
            description: "Integrate any BRC/ERC/SPL token as a payment method that turns purchases into token-driven transactions",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <RocketLg color="#fff" />,
            title: "Boosting Token Utility",
            description: "Increase a token's usage by making it a viable payment option across any website or app to encourage more adoption",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Seamless Integration",
            description: "Easily activate any custom token across properties with droplinkeds’ integration tools. no technical complexity involved when implementing into a website, game or mobile app",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Day 0 Utility'
            headingSubtitle='Enable communities to adopt custom tokens to purchase products and services, \n boosting utility and different use cases'
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

export default CustomTokensFeatures