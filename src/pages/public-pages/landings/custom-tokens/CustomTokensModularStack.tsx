import React from 'react'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardData } from '../_shared/components/card/Cards'
import { GameControllerLg } from 'assets/icons/System/GameController/GameControllerLg'
import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { CoinLg } from 'assets/icons/Finance/Coin/CoinLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { CardImage } from '../_shared/components/card'

function CustomTokensModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <GameControllerLg color="#fff" />,
            title: "Game Developers and Startups",
            description: "Whether you're a game studio or tech company, enhance any token's utility by enabling it as a payment option for fans and customers",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Game Developers and Startups' src='https://upload-file-droplinked.s3.amazonaws.com/1573bebc0b15f177649d19c14968efe15a2e5797b1a69711f5efe38ccb6b927c.png' />
        },
        {
            icon: <BarchartLg color="#fff" />,
            title: "Real Use, Real Value",
            description: "The more utility that it begins to provide, the more the token is used. Give customers a reason to hold and spend the token while the community grows",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Real Use, Real Value' src='https://upload-file-droplinked.s3.amazonaws.com/a9c270953cbc427ebedee57b7cfc9675defea332f8d8e0e33a69168444647e8c.png' />
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: "Frictionless Payments",
            description: "Provide the community with a seamless way to use the token with smooth and simple custom payment gateway that accepts transactions across any platform",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Frictionless Payments' src='https://upload-file-droplinked.s3.amazonaws.com/262fb79d7f48cbde821407be516cbe1af9a5f26ea2d643d20485b8107d9a8009.png' />
        },
        {
            icon: <CoinLg color="#fff" />,
            title: "Custom Token Payments",
            description: "Allow customers to use any token to purchase goods and services that boost utility across an ecosystem",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Custom Token Payments' src='https://upload-file-droplinked.s3.amazonaws.com/301a00f8ffbb17d16fbf6f3cc7ce2f33301c835513cb332ec51b83cf16c9c133.png' />
        },
        {
            icon: <ChartLg color="#fff" />,
            title: "Better Token Circulation",
            description: "Increased token usage drives demand and liquidity to further increase utility over time",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Better Token Circulation' src='https://upload-file-droplinked.s3.amazonaws.com/b425064b968491642603d1d020c5bd4ccf8b1606e5e46d006f542483a220c470.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Simple Setup & Integration",
            description: "Activate custom token payments on any site or property with just a few clicks all within the merchant dashboard, with no need for complex configurations",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Simple Setup & Integration' src='https://upload-file-droplinked.s3.amazonaws.com/21b0a9d737496018d7377c065d039e615f33555dd3d92d270c274c3eafabc496.png' />
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