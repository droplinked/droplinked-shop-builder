import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import ProPlanCard from './ProPlanCard'
import ModularStackTypography from '../svgs/ModularStackTypography'

interface ModularStackProps {
    t: (key: string) => string;
}

export default function ModularStack({ t }: ModularStackProps) {
    const cardsData: CardData[] = [{
        icon: <BoxLg color="#fff" />,
        title: t('modularStack.cards.accessProducts.title'),
        description: t('modularStack.cards.accessProducts.description'),
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
        children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
    }, {
        icon: <Layer1Lg color="#fff" />,
        title: t('modularStack.cards.web3Support.title'),
        description: t('modularStack.cards.web3Support.description'),
        gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
        children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
    }, {
        icon: <PriceplanLg color="#fff" />,
        title: t('modularStack.cards.proPlan.title'),
        description: t('modularStack.cards.proPlan.description'),
        gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
        hasBackgroundOverlay: true,
        children: <ProPlanCard />
    }]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle={t('modularStack.sectionTitle')}
            headingTitle={t('modularStack.headingTitle')}
            headingSubtitle={t('modularStack.headingSubtitle')}
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
