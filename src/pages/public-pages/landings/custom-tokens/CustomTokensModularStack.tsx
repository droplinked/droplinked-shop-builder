import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage } from '../_shared/components/card'
import Cards, { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import { GameControllerLg } from 'assets/icons/System/GameController/GameControllerLg'
import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { CoinLg } from 'assets/icons/Finance/Coin/CoinLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/custom-tokens/en.json'
import localAr from 'locales/public-pages/landings/custom-tokens/ar.json'

function CustomTokensModularStack() {
    const { t } = useLocaleResources('public-pages/landings/custom-tokens', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <GameControllerLg color="#fff" />,
            title: t('modularStack.cards.gameDevelopers.title'),
            description: t('modularStack.cards.gameDevelopers.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.gameDevelopers.title')} src='https://upload-file-droplinked.s3.amazonaws.com/1573bebc0b15f177649d19c14968efe15a2e5797b1a69711f5efe38ccb6b927c.png' />
        },
        {
            icon: <BarchartLg color="#fff" />,
            title: t('modularStack.cards.realUseRealValue.title'),
            description: t('modularStack.cards.realUseRealValue.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.realUseRealValue.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a9c270953cbc427ebedee57b7cfc9675defea332f8d8e0e33a69168444647e8c.png' />
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: t('modularStack.cards.frictionlessPayments.title'),
            description: t('modularStack.cards.frictionlessPayments.description'),
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt={t('modularStack.cards.frictionlessPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/262fb79d7f48cbde821407be516cbe1af9a5f26ea2d643d20485b8107d9a8009.png' />
        },
        {
            icon: <CoinLg color="#fff" />,
            title: t('modularStack.cards.customTokenPayments.title'),
            description: t('modularStack.cards.customTokenPayments.description'),
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt={t('modularStack.cards.customTokenPayments.title')} src='https://upload-file-droplinked.s3.amazonaws.com/301a00f8ffbb17d16fbf6f3cc7ce2f33301c835513cb332ec51b83cf16c9c133.png' />
        },
        {
            icon: <ChartLg color="#fff" />,
            title: t('modularStack.cards.betterTokenCirculation.title'),
            description: t('modularStack.cards.betterTokenCirculation.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.betterTokenCirculation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/b425064b968491642603d1d020c5bd4ccf8b1606e5e46d006f542483a220c470.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('modularStack.cards.simpleSetupIntegration.title'),
            description: t('modularStack.cards.simpleSetupIntegration.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.simpleSetupIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/21b0a9d737496018d7377c065d039e615f33555dd3d92d270c274c3eafabc496.png' />
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

export default CustomTokensModularStack