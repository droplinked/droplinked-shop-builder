import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import Features from '../svgs/Features'

export default function SetOfFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <TokenpayLg color="#fff" />,
            title: "Tamper-Proof Sales",
            description: "Customers cannot bypass approved co-seller referrals when making purchases in order to protect commission integrity",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ChartLg color="#fff" />,
            title: "Automated Tracking",
            description: "Easily track affiliate sales and SaaS subscription referrals that ensure accurate, automated commission payouts between parties",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }, {
            icon: <ConfigureLg color="#fff" />,
            title: "Seamless Integration",
            description: "Use the technology without additional coding or technical skills needed to further simplify partnership tracking between distributors and co-sellers",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Secure Affiliate Partnerships'
            headingSubtitle={`Leverage onchain attribution to protect partner relationships. Guarantee accurate\ncommissions while eliminating fraud typically associated with bad actors.`}
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(3, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
