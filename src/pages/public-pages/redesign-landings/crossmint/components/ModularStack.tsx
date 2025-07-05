import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import ModularStackTypography from '../../_shared/svgs/ModularStackTypography'
import ProPlanCard from './ProPlanCard'

export default function ModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: "Access +10k Products Instantly",
            description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: "Web3 Technology Support",
            description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <PriceplanLg color="#fff" />,
            title: "3 Month Pro Plan",
            description: "Enjoy premium features for 3 months for being a loyal crossmint customer.",
            gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
            hasBackgroundOverlay: true,
            children: <ProPlanCard />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                cardsData={cardsData}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
