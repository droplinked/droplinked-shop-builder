import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'

function DigitalGoodsModularStack() {
    const { t } = useLocaleResources('public-pages/landings/digital-goods')

    const cardsData: CardData[] = [
        {
            icon: <NftLg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.mintingAssets.title'),
            description: t('DigitalGoodsModularStack.cards.mintingAssets.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.mintingAssets.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a45bbbeb609a3ad1da38e1d71f032ff7daa21735f0b48ed4529c891e7db5a133.png' />
        },
        {
            icon: <NetworkLg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.multiChainIntegration.title'),
            description: t('DigitalGoodsModularStack.cards.multiChainIntegration.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.multiChainIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/9b35f5190d0201952439d21563b7c76c565626b5cb310502d50d2395cfd883b5.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.loyaltyAndRoyaltyPrograms.title'),
            description: t('DigitalGoodsModularStack.cards.loyaltyAndRoyaltyPrograms.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.loyaltyAndRoyaltyPrograms.title')} src='https://upload-file-droplinked.s3.amazonaws.com/129c36c0dacd7293e40152061a4fe130f7cb7fd8828ad2b08122bb508c1f989e.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.offerPerksDiscounts.title'),
            description: t('DigitalGoodsModularStack.cards.offerPerksDiscounts.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.offerPerksDiscounts.title')} src='https://upload-file-droplinked.s3.amazonaws.com/f2511d193573eab6db67d1e08574c601dcce953181a3ac38097aee0361b7c0f7.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.embeddableProductTiles.title'),
            description: t('DigitalGoodsModularStack.cards.embeddableProductTiles.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.embeddableProductTiles.title')} src='https://upload-file-droplinked.s3.amazonaws.com/add4930cd84e9ffdfe6e1149a5eabbbd885c871a4647f2fab5040f361ed81ab0.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: t('DigitalGoodsModularStack.cards.decentralizedAffiliateNetwork.title'),
            description: t('DigitalGoodsModularStack.cards.decentralizedAffiliateNetwork.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('DigitalGoodsModularStack.cards.decentralizedAffiliateNetwork.title')} src='https://upload-file-droplinked.s3.amazonaws.com/519161d65a791400d307ff0747c5108f23c4a152d1e2497c48752df8a5533e0e.png' />
        }
    ]

    const templateColumns = {
        base: '1fr',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)'
    }

    return (
        <PlatformFunctionalities
            cardsData={cardsData}
            templateColumns={templateColumns}
            hasGradiantOverlay={true}
        />
    )
}

export default DigitalGoodsModularStack