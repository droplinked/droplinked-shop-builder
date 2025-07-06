import React from 'react'
import { CardData } from '../../_shared/components/card/Cards'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import { SendmoneyLg } from 'assets/icons/Finance/SendMoney/SendmoneyLg'
import { SocialmediaLg } from 'assets/icons/System/SocialMedia/SocialmediaLg'

export default function ModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ShieldLg color='#fff' />,
            title: 'Protected Commissions',
            description: 'Partners and co-sellers earn their fair share with secure affiliate tracking that prevents any loss of commissions for their verified work',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <AffiliateLg color='#fff' />,
            title: 'Affiliate Made Easy',
            description: 'Integrate inventory and a rewards system with various SaaS platforms and services to expand earning potential across networks',
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: 'Real-Time Analytics',
            description: 'Monitor subscription referrals and performance metrics in real time to maintain and keep complete control of the affiliate side of the business',
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <TokenpayLg color='#fff' />,
            title: 'Secure Affiliate Tracking',
            description: 'Ensure commissions are safely attributed onchain thanks to advanced tracking technology',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <SendmoneyLg color='#fff' />,
            title: 'Automated Commission Payouts and Distributions',
            description: 'Receive automated, accurate payouts that make activating and running affiliate management effortless',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <SocialmediaLg color='#fff' />,
            title: 'Expand Revenue Streams',
            description: 'Expand reach through multiple networks and partners to grow income on both physical inventory, digital goods and subscription services',
            gridColumn: { base: 'span 1', md: 'span 2' }
        }
    ]

    const templateColumns = {
        base: '1fr',
        md: 'repeat(5, 1fr)',
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
