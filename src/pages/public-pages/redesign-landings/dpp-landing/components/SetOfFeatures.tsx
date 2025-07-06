import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import Features from '../../_shared/svgs/Features'

export default function SetOfFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: "Traceability",
            description: "Real-time tracking, supply chain insights, counterfeit prevention",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: "Modular Transparency",
            description: "Product history visibility, public verification, consistent information",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }, {
            icon: <ShieldLg color="#fff" />,
            title: "Security",
            description: "Immutable records and controlled access",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Enhancing DPPs Onchain'
            headingSubtitle={`Implement onchain technology with Digital Product Passports (DPPs) increases the\nvalue of goods in terms of security, traceability and financing for businesses`}
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
