// Shared modular stack section showing technical features and capabilities
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'
import { CardImage } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import ProPlanCard from './ProPlanCard'
import localEn from 'locales/public-pages/landings/partner-pages/en.json'
import localAr from 'locales/public-pages/landings/partner-pages/ar.json'

export default function ModularStack() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: t('modularStack.cards.accessProducts.title'),
            description: t('modularStack.cards.accessProducts.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt={t('modularStack.cards.accessProducts.title')} src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('modularStack.cards.web3Technology.title'),
            description: t('modularStack.cards.web3Technology.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt={t('modularStack.cards.web3Technology.title')} src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <PriceplanLg color="#fff" />,
            title: t('modularStack.cards.proPlan.title'),
            description: t('modularStack.cards.proPlan.description'),
            gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
            hasBackgroundOverlay: true,
            children: <ProPlanCard />
        }
    ]

    return <PlatformFunctionalities cardsData={cardsData} />
}