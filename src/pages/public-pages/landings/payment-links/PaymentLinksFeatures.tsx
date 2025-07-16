import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { WalletLg } from 'assets/icons/Finance/Wallet/WalletLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function PaymentLinksFeatures() {
    const { t } = useLocaleResources('public-pages/landings/payment-links')

    const cardsData: CardData[] = [
        {
            icon: <LinkLg color="#fff" />,
            title: t('PaymentLinksFeatures.cards.instantPaymentLinks.title'),
            description: t('PaymentLinksFeatures.cards.instantPaymentLinks.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('PaymentLinksFeatures.cards.customizablePaymentPages.title'),
            description: t('PaymentLinksFeatures.cards.customizablePaymentPages.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <WalletLg color="#fff" />,
            title: t('PaymentLinksFeatures.cards.cryptoAndFiatPayments.title'),
            description: t('PaymentLinksFeatures.cards.cryptoAndFiatPayments.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('PaymentLinksFeatures.sectionTitle')}
            headingTitle={t('PaymentLinksFeatures.headingTitle')}
            headingSubtitle={t('PaymentLinksFeatures.headingSubtitle')}
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

export default PaymentLinksFeatures