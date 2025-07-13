import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import CardImage from '../_shared/components/card/CardImage'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import { SendmoneyLg } from 'assets/icons/Finance/SendMoney/SendmoneyLg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'
import localEn from 'locales/public-pages/landings/onchain-subscriptions/en.json'
import localAr from 'locales/public-pages/landings/onchain-subscriptions/ar.json'

export default function OnchainModularStack() {
    const { t } = useLocaleResources('public-pages/landings/onchain-subscriptions', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <ShieldLg color='#fff' />,
            title: t('modularStack.cards.protectedCommissions.title'),
            description: t('modularStack.cards.protectedCommissions.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/c4cb81cf2fbf3772a35fa594be41cab7cff0735b18977426bb677c0e329b0db2.png'
                    alt={t('modularStack.cards.protectedCommissions.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <AffiliateLg color='#fff' />,
            title: t('modularStack.cards.affiliateMadeEasy.title'),
            description: t('modularStack.cards.affiliateMadeEasy.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/789d4d50c495313df0c6bbba7f09145857810477565a9f1e5c7d0fdef01fabec.png'
                    alt={t('modularStack.cards.affiliateMadeEasy.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: t('modularStack.cards.realTimeAnalytics.title'),
            description: t('modularStack.cards.realTimeAnalytics.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/c1f7182e9183061a3cb42afe6fe409e95781878ef637b48c61d93d5a5150acd4.png'
                    alt={t('modularStack.cards.realTimeAnalytics.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <TokenpayLg color='#fff' />,
            title: t('modularStack.cards.secureAffiliateTracking.title'),
            description: t('modularStack.cards.secureAffiliateTracking.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/a22096db87c5a99203f2710d266d481c6924671a0e64603b225b2bfe040d0889.png'
                    alt={t('modularStack.cards.secureAffiliateTracking.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <SendmoneyLg color='#fff' />,
            title: t('modularStack.cards.automatedCommissionPayouts.title'),
            description: t('modularStack.cards.automatedCommissionPayouts.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/c96a5dc18eb5a2d36e885e6f621ec56aa7fbb38ff118457b9cbc59e6fcc8f0eb.png'
                    alt={t('modularStack.cards.automatedCommissionPayouts.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <SocialmediaLg color='#fff' />,
            title: t('modularStack.cards.expandRevenueStreams.title'),
            description: t('modularStack.cards.expandRevenueStreams.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/8bbd0fdc467dcfb3d22f7dd5b6773bf7e1dbdc2ea2a0886e5eee4002987468da.png'
                    alt={t('modularStack.cards.expandRevenueStreams.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
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