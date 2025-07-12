import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { WalletLg } from 'assets/icons/Finance/Wallet/WalletLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import { CursorLg } from 'assets/icons/System/Cursor/CursorLg'
import { SettinggearLg } from 'assets/icons/System/SettingGear/SettinggearLg'
import React from 'react'
import { CardData } from '../_shared/components/card/Cards'
import { CardImage } from '../_shared/components/card'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'

function PaymentLinksModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: "Sell Anywhere, Anytime",
            description: "Generate traffic and sales from wherever customers are by easily sharing payment links across any platform",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Sell Anywhere, Anytime' src='https://upload-file-droplinked.s3.amazonaws.com/99c575ebd82d8853f32775b716bda56fc80bed1aafaa120f8529387a424dcb4e.png' />
        },
        {
            icon: <CursorLg color="#fff" />,
            title: "No Coding Required",
            description: "Configure payment pages all within a few clicks, no technical skills are required",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='No Coding Required' src='https://upload-file-droplinked.s3.amazonaws.com/4b886aabec7e48e608e3087c07194d4d508f7a24bb12f3909a0d3aa0feee214a.png' />
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Streamlined Checkout",
            description: "Simplified checkout flows for customers making payments a breeze by only collecting the basic information you need",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Streamlined Checkout' src='https://upload-file-droplinked.s3.amazonaws.com/72cbacca6fcdd9207824821316dbbb9a39dee4df66bd79d664ed32a5134bd3ee.png' />
        },
        {
            icon: <LinkLg color="#fff" />,
            title: "Direct Payment Links & QR Codes",
            description: "Enable quick, frictionless purchases with shareable payment links and QR codes",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Direct Payment Links & QR Codes' src='https://upload-file-droplinked.s3.amazonaws.com/fa662a3a080a6815561bfe1ed76aaa7363fe503a1a1413e02f6b3c50b68041c5.png' />
        },
        {
            icon: <SettinggearLg color="#fff" />,
            title: "Customizable Experience",
            description: "Customize payment pages to reflect your brand's identity, ensuring a cohesive customer experience",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Customizable Experience' src='https://upload-file-droplinked.s3.amazonaws.com/1cc3738198c9fd436a93ffc4305546d0fb73485e0332364f14e585db76236dbc.png' />
        },
        {
            icon: <WalletLg color="#fff" />,
            title: "Alternative Payment Methods",
            description: "Accept cryptocurrencies pegged to stable coins to add more flexibility for customers during checkout",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Alternative Payment Methods' src='https://upload-file-droplinked.s3.amazonaws.com/913d46bd27a9572d19fc91d0a6f3fa1b241a40cec5f8b93dea3774270644a965.png' />
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

export default PaymentLinksModularStack