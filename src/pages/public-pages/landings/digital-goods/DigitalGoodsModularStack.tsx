import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

// Import locale files
import localEn from 'locales/public-pages/landings/digital-goods/en.json'
import localAr from 'locales/public-pages/landings/digital-goods/ar.json'

function DigitalGoodsModularStack() {
    const { t } = useLocaleResources('public-pages/landings/digital-goods', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <NftLg color="#fff" />,
            title: t('modularStack.cards.mintingAssets.title'),
            description: t('modularStack.cards.mintingAssets.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.mintingAssets.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a45bbbeb609a3ad1da38e1d71f032ff7daa21735f0b48ed4529c891e7db5a133.png' />
        },
        {
            icon: <NetworkLg color="#fff" />,
            title: t('modularStack.cards.multiChainIntegration.title'),
            description: t('modularStack.cards.multiChainIntegration.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.multiChainIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/9b35f5190d0201952439d21563b7c76c565626b5cb310502d50d2395cfd883b5.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: t('modularStack.cards.loyaltyAndRoyaltyPrograms.title'),
            description: t('modularStack.cards.loyaltyAndRoyaltyPrograms.description'),
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt={t('modularStack.cards.loyaltyAndRoyaltyPrograms.title')} src='https://upload-file-droplinked.s3.amazonaws.com/129c36c0dacd7293e40152061a4fe130f7cb7fd8828ad2b08122bb508c1f989e.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: t('modularStack.cards.offerPerksDiscounts.title'),
            description: t('modularStack.cards.offerPerksDiscounts.description'),
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt={t('modularStack.cards.offerPerksDiscounts.title')} src='https://upload-file-droplinked.s3.amazonaws.com/f2511d193573eab6db67d1e08574c601dcce953181a3ac38097aee0361b7c0f7.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: t('modularStack.cards.embeddableProductTiles.title'),
            description: t('modularStack.cards.embeddableProductTiles.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.embeddableProductTiles.title')} src='https://upload-file-droplinked.s3.amazonaws.com/add4930cd84e9ffdfe6e1149a5eabbbd885c871a4647f2fab5040f361ed81ab0.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: t('modularStack.cards.decentralizedAffiliateNetwork.title'),
            description: t('modularStack.cards.decentralizedAffiliateNetwork.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.decentralizedAffiliateNetwork.title')} src='https://upload-file-droplinked.s3.amazonaws.com/519161d65a791400d307ff0747c5108f23c4a152d1e2497c48752df8a5533e0e.png' />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle={t('modularStack.sectionTitle')}
            headingTitle={t('modularStack.headingTitle')}
            headingSubtitle={t('modularStack.headingSubtitle')}
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}

export default DigitalGoodsModularStack