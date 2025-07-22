import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { CoinLg } from 'assets/icons/Finance/Coin/CoinLg'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { GameControllerLg } from 'assets/icons/System/GameController/GameControllerLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'

function CustomTokensModularStack() {
    const { t } = useLocaleResources('public-pages/landings/custom-tokens')

    const cardsData: CardData[] = [
        {
            icon: <GameControllerLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.gameDevelopers.title'),
            description: t('CustomTokensModularStack.cards.gameDevelopers.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.gameDevelopers.title')} src='https://upload-file-droplinked.s3.amazonaws.com/945bf17e0d317a2d175d0b6ad374fca530a9c57b3c3911d86fa568119c97593a.png' />
        },
        {
            icon: <BarchartLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.realUseRealValue.title'),
            description: t('CustomTokensModularStack.cards.realUseRealValue.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.realUseRealValue.title')} src='https://upload-file-droplinked.s3.amazonaws.com/8002c81eb8d954dd875208070db832f191a0fa65b989f09952b0761d19fb5eb8.png' />
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.frictionlessPayments.title'),
            description: t('CustomTokensModularStack.cards.frictionlessPayments.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.frictionlessPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/41b91962bca15ade895f8f84e2a66a8d66bf9c5ee7124ddf7b29bc2f2feea532.png' />
        },
        {
            icon: <CoinLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.customTokenPayments.title'),
            description: t('CustomTokensModularStack.cards.customTokenPayments.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.customTokenPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/e9ea54e13ff228c71c1a1230e1bb3805fa00e062a561f7e38f77c790d1536cd3.png' />
        },
        {
            icon: <ChartLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.betterTokenCirculation.title'),
            description: t('CustomTokensModularStack.cards.betterTokenCirculation.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.betterTokenCirculation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a8e3938dcefa2500b00399aa2c95c26dd899369b9d495279d69c903f1ba4f9ed.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.simpleSetupIntegration.title'),
            description: t('CustomTokensModularStack.cards.simpleSetupIntegration.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.simpleSetupIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/d43e4821c2ecda8a4be1e39bf3d68855322266e8b51bf137314cabf9009c1e4f.png' />
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

export default CustomTokensModularStack