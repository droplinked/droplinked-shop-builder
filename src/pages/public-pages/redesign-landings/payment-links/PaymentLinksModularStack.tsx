import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { WalletLg } from 'assets/icons/Finance/Wallet/WalletLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import { CursorLg } from 'assets/icons/System/Cursor/CursorLg'
import { SettinggearLg } from 'assets/icons/System/SettingGear/SettinggearLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'

function PaymentLinksModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: "Sell Anywhere, Anytime",
            description: "Generate traffic and sales from wherever customers are by easily sharing payment links across any platform",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <CursorLg color="#fff" />,
            title: "No Coding Required",
            description: "Configure payment pages all within a few clicks, no technical skills are required",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Streamlined Checkout",
            description: "Simplified checkout flows for customers making payments a breeze by only collecting the basic information you need",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <LinkLg color="#fff" />,
            title: "Direct Payment Links & QR Codes",
            description: "Enable quick, frictionless purchases with shareable payment links and QR codes",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <SettinggearLg color="#fff" />,
            title: "Customizable Experience",
            description: "Customize payment pages to reflect your brand’s identity, ensuring a cohesive customer experience",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <WalletLg color="#fff" />,
            title: "Alternative Payment Methods",
            description: "Accept cryptocurrencies pegged to stable coins to add more flexibility for customers during checkout",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}

export default PaymentLinksModularStack