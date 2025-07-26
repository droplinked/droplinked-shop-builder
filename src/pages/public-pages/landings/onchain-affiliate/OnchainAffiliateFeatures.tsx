import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function OnchainAffiliateFeatures() {
    const { t } = useLocaleResources('public-pages/landings/onchain-affiliate')

    const cardsData: CardData[] = [
        {
            icon: <SocialmediaLg color="#fff" />,
            title: t('OnchainAffiliateFeatures.cards.automatedDistributions.title'),
            description: t('OnchainAffiliateFeatures.cards.automatedDistributions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('OnchainAffiliateFeatures.cards.transparentTransactions.title'),
            description: t('OnchainAffiliateFeatures.cards.transparentTransactions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <TransferLg color="#fff" />,
            title: t('OnchainAffiliateFeatures.cards.directSettlements.title'),
            description: t('OnchainAffiliateFeatures.cards.directSettlements.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('OnchainAffiliateFeatures.sectionTitle')}
            headingTitle={t('OnchainAffiliateFeatures.headingTitle')}
            headingSubtitle={t('OnchainAffiliateFeatures.headingSubtitle')}
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