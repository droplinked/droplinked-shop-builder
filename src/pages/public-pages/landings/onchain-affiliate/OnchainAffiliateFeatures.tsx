import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/onchain-affiliate/en.json'
import localAr from 'locales/public-pages/landings/onchain-affiliate/ar.json'

function OnchainAffiliateFeatures() {
    const { t } = useLocaleResources('public-pages/landings/onchain-affiliate', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <SocialmediaLg color="#fff" />,
            title: t('features.cards.automatedDistributions.title'),
            description: t('features.cards.automatedDistributions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('features.cards.transparentTransactions.title'),
            description: t('features.cards.transparentTransactions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <TransferLg color="#fff" />,
            title: t('features.cards.directSettlements.title'),
            description: t('features.cards.directSettlements.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('features.sectionTitle')}
            headingTitle={t('features.headingTitle')}
            headingSubtitle={t('features.headingSubtitle')}
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