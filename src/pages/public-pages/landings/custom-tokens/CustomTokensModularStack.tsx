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
            children: <CardImage alt={t('CustomTokensModularStack.cards.gameDevelopers.title')} src='https://upload-file-droplinked.s3.amazonaws.com/1573bebc0b15f177649d19c14968efe15a2e5797b1a69711f5efe38ccb6b927c.png' />
        },
        {
            icon: <BarchartLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.realUseRealValue.title'),
            description: t('CustomTokensModularStack.cards.realUseRealValue.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.realUseRealValue.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a9c270953cbc427ebedee57b7cfc9675defea332f8d8e0e33a69168444647e8c.png' />
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.frictionlessPayments.title'),
            description: t('CustomTokensModularStack.cards.frictionlessPayments.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.frictionlessPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/262fb79d7f48cbde821407be516cbe1af9a5f26ea2d643d20485b8107d9a8009.png' />
        },
        {
            icon: <CoinLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.customTokenPayments.title'),
            description: t('CustomTokensModularStack.cards.customTokenPayments.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.customTokenPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/301a00f8ffbb17d16fbf6f3cc7ce2f33301c835513cb332ec51b83cf16c9c133.png' />
        },
        {
            icon: <ChartLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.betterTokenCirculation.title'),
            description: t('CustomTokensModularStack.cards.betterTokenCirculation.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.betterTokenCirculation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/b425064b968491642603d1d020c5bd4ccf8b1606e5e46d006f542483a220c470.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('CustomTokensModularStack.cards.simpleSetupIntegration.title'),
            description: t('CustomTokensModularStack.cards.simpleSetupIntegration.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('CustomTokensModularStack.cards.simpleSetupIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/21b0a9d737496018d7377c065d039e615f33555dd3d92d270c274c3eafabc496.png' />
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