import { BoxLg } from 'assets/icons/Finance/Box/BoxLg';
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg';
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg';
import AppImage from 'components/common/image/AppImage';
import React from 'react';
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer';
import { Cards } from '../../_shared/components/card';
import { CardData } from '../../_shared/components/card/Cards';
import ProPlanCard from './ProPlanCard';

export default function ModularStack() {
    const cardsData: CardData[] = [{
        icon: <BoxLg color="#fff" />,
        title: "Access +10k Products Instantly",
        description: "Choose from a vast catalog to customize and sell unique merchandise on demand.",
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
        children: <AppImage width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/a011794e8a2da29dfb241e853e2382bebfbed7e0505f0a21a86ead66f01e1bff.png' />
    }, {
        icon: <Layer1Lg color="#fff" />,
        title: "Web3 Technology Support",
        description: "Seamlessly integrate NFTs alongside blockchain features to create novel experiences with assets you own or want to offer.",
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
        children: <AppImage width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/692b7055b74f370007199b6f1cac42e7a8522e7780841f7d0855a043cd21a8bc.png' />
    }, {
        icon: <PriceplanLg color="#fff" />,
        title: "3 Month Pro Plan",
        description: "Enjoy premium features for 3 months for being a loyal crossmint customer.",
        gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
        hasBackgroundOverlay: true,
        children: <ProPlanCard />
    }];

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographyText='Modular Stack'
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
