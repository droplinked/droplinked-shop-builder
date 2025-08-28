// Shared modular stack section showing technical features and capabilities
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'
import { CardImage } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import ProPlanCard from './ProPlanCard'
import { usePartnerLanding } from '../context/PartnerLandingContext'

export default function ModularStack() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages')
    const { partnerName, trialMonths, showProPlanCard } = usePartnerLanding()
 
    // Base cards that all partners see
    const baseCards: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: t('ModularStack.cards.accessProducts.title'),
            description: t('ModularStack.cards.accessProducts.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt={t('ModularStack.cards.accessProducts.title')} src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('ModularStack.cards.web3Technology.title'),
            description: t('ModularStack.cards.web3Technology.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt={t('ModularStack.cards.web3Technology.title')} src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        }
    ]

    // Template-based additional cards
    const getTemplateSpecificCards = (): CardData[] => {
        if (!showProPlanCard) return [];
        
        return [{
            icon: <PriceplanLg color="#fff" />, 
            title: t('ModularStack.cards.proPlan.title', { partnerName, trialMonths }),
            description: t('ModularStack.cards.proPlan.description', { partnerName, trialMonths }),
            gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
            hasBackgroundOverlay: true,
            children: <ProPlanCard />
        }]
    }

    const cardsData: CardData[] = [
        ...baseCards,
        ...getTemplateSpecificCards()
    ]

    return <PlatformFunctionalities cardsData={cardsData} isGridCards={false} />
}