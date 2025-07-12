import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { WalletLg } from 'assets/icons/Finance/Wallet/WalletLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/payment-links/en.json'
import localAr from 'locales/public-pages/landings/payment-links/ar.json'

function PaymentLinksFeatures() {
    const { t } = useLocaleResources('public-pages/landings/payment-links', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <LinkLg color="#fff" />,
            title: t('features.cards.instantPaymentLinks.title'),
            description: t('features.cards.instantPaymentLinks.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.customizablePaymentPages.title'),
            description: t('features.cards.customizablePaymentPages.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <WalletLg color="#fff" />,
            title: t('features.cards.cryptoAndFiatPayments.title'),
            description: t('features.cards.cryptoAndFiatPayments.description'),
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

export default PaymentLinksFeatures