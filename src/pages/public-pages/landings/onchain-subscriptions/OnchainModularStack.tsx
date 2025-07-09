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
                    src='https://upload-file-droplinked.s3.amazonaws.com/c4cb81cf2fbf3772a35fa594be41cab7cff0735b18977426bb677c0e329b0db2.png'
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
                    src='https://upload-file-droplinked.s3.amazonaws.com/789d4d50c495313df0c6bbba7f09145857810477565a9f1e5c7d0fdef01fabec.png'
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
                    src='https://upload-file-droplinked.s3.amazonaws.com/c1f7182e9183061a3cb42afe6fe409e95781878ef637b48c61d93d5a5150acd4.png'
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
                    src='https://upload-file-droplinked.s3.amazonaws.com/a22096db87c5a99203f2710d266d481c6924671a0e64603b225b2bfe040d0889.png'
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
                    src='https://upload-file-droplinked.s3.amazonaws.com/c96a5dc18eb5a2d36e885e6f621ec56aa7fbb38ff118457b9cbc59e6fcc8f0eb.png'
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
                    src='https://upload-file-droplinked.s3.amazonaws.com/8bbd0fdc467dcfb3d22f7dd5b6773bf7e1dbdc2ea2a0886e5eee4002987468da.png'
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