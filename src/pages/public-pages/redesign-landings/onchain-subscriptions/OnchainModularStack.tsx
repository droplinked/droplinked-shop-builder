import React from 'react'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import CardImage from '../_shared/components/card/CardImage'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import { SendmoneyLg } from 'assets/icons/Finance/SendMoney/SendmoneyLg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'

export default function OnchainModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ShieldLg color='#fff' />,
            title: 'Protected Commissions',
            description: 'Partners and co-sellers earn their fair share with secure affiliate tracking that prevents any loss of commissions for their verified work',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/2464553b878c29203c594252f23092bdff4ca089c6461c0f4194d0c6659af775.png'
                    alt='Protected Comissions'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <AffiliateLg color='#fff' />,
            title: 'Affiliate Made Easy',
            description: 'Integrate inventory and a rewards system with various SaaS platforms and services to expand earning potential across networks',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/b61d798412fa0aae5a1435ba57a20469a4aa19038b6a7ba73d11747ea6295d94.png'
                    alt='Affiliate Made Easy'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: 'Real-Time Analytics',
            description: 'Monitor subscription referrals and performance metrics in real time to maintain and keep complete control of the affiliate side of the business',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/683e10a81c48a3693f7ba9ec1a6f039250bd53f7d7b93c6d1e1b3c76d21c4b50.png'
                    alt='Real-Time Analytics'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <TokenpayLg color='#fff' />,
            title: 'Secure Affiliate Tracking',
            description: 'Ensure commissions are safely attributed onchain thanks to advanced tracking technology',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/d72f8bca0b4c34c1234d0af39be4062ce0e690fe2efd6685d776220764e9ca7f.png'
                    alt='Secure Affiliate Tracking'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <SendmoneyLg color='#fff' />,
            title: 'Automated Commission Payouts and Distributions',
            description: 'Receive automated, accurate payouts that make activating and running affiliate management effortless',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/1ef326559123abe754e418ec1c98910f22777c96867b960bd1b5fcdc3d669498.png'
                    alt='Automated Commission Payouts and Distributions'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <SocialmediaLg color='#fff' />,
            title: 'Expand Revenue Streams',
            description: 'Expand reach through multiple networks and partners to grow income on both physical inventory, digital goods and subscription services',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/bf2eeff4f414bc8738b08456ea547b20031d49ab15cd882aae7a2738a02ac958.png'
                    alt='Expand Revenue Streams'
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