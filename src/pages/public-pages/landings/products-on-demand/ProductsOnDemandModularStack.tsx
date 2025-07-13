import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { DeliverytruckLg } from 'assets/icons/System/DeliveryTruck/DeliverytruckLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import localEn from 'locales/public-pages/landings/products-on-demand/en.json'
import localAr from 'locales/public-pages/landings/products-on-demand/ar.json'

function ProductsOnDemandModularStack() {
    const { t } = useLocaleResources('public-pages/landings/products-on-demand', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <PositionLg color="#fff" />,
            title: t('modularStack.cards.moreThan10kItems.title'),
            description: t('modularStack.cards.moreThan10kItems.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/66e8e21c6fff912f2bb80241c730c9e0922f4f0930fe054f09c6e6edb213ed33.png' />
        },
        {
            icon: <DeliverytruckLg color="#fff" />,
            title: t('modularStack.cards.automatedShipping.title'),
            description: t('modularStack.cards.automatedShipping.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('modularStack.cards.automatedShipping.title')} src='https://upload-file-droplinked.s3.amazonaws.com/c3c4171fdd51f514d68269e05010f233b488d93959be27308aa53968933f7046.png' />
        },
        {
            icon: <PositionLg color="#fff" />,
            title: t('modularStack.cards.mintToMerch.title'),
            description: t('modularStack.cards.mintToMerch.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/85e77cd08d1703650ddf87c4841d9403a2e01e1bb456ab0ffe9a46b3354790a4.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: t('modularStack.cards.offerPerks.title'),
            description: t('modularStack.cards.offerPerks.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('modularStack.cards.offerPerks.title')} src='https://upload-file-droplinked.s3.amazonaws.com/f2511d193573eab6db67d1e08574c601dcce953181a3ac38097aee0361b7c0f7.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: t('modularStack.cards.embeddableProductTiles.title'),
            description: t('modularStack.cards.embeddableProductTiles.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('modularStack.cards.embeddableProductTiles.title')} src='https://upload-file-droplinked.s3.amazonaws.com/add4930cd84e9ffdfe6e1149a5eabbbd885c871a4647f2fab5040f361ed81ab0.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: t('modularStack.cards.decentralizedAffiliateNetwork.title'),
            description: t('modularStack.cards.decentralizedAffiliateNetwork.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('modularStack.cards.decentralizedAffiliateNetwork.title')} src='https://upload-file-droplinked.s3.amazonaws.com/519161d65a791400d307ff0747c5108f23c4a152d1e2497c48752df8a5533e0e.png' />
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

export default ProductsOnDemandModularStack