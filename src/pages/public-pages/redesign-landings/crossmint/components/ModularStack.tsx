import React from 'react'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import { Cards } from '../../components/card'
import { CardData } from '../../components/card/Cards';
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg';
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg';
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg';

export default function ModularStack() {
    const cardsData: CardData[] = [{
        icon: <BoxLg color="#fff" />,
        title: "Access +10k Products Instantly",
        description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
    }, {
        icon: <Layer1Lg color="#fff" />,
        title: "Web3 Technology Support",
        description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
    }, {
        icon: <PriceplanLg color="#fff" />,
        title: "3 Month Pro Plan",
        description: "Enjoy premium features for 3 months for being a loyal crossmint customer.",
        gridColumn: { base: "1fr", md: "span 2", lg: "span 2" }
    }];

    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='layer'
                sectionTitle='MODULAR STACK'
                headingTitle='Platform Functionalities'
                headingSubtitle='droplinked provides customizable tools and integrations to support any business'
                typographyText='Modular Stack'
            >                <Cards
                    cardsData={cardsData}
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(2, 1fr)'
                    }}
                />
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
