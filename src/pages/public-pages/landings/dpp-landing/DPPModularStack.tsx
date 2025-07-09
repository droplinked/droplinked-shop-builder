import { Refresh1Lg } from 'assets/icons/Action/Refresh1/Refresh1Lg'
import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TechnologyLg } from 'assets/icons/System/Technology/TechnologyLg'
import React from 'react'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import CardImage from '../_shared/components/card/CardImage'

export default function DPPModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <Refresh1Lg color='#fff' />,
            title: 'Comprehensive Lifecycle Data',
            description: 'Capture and access detailed information from production to disposal, ensuring full lifecycle traceability',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/d1be62b07688b9b8fb13aa60c4d2e941a890aca21958da54612d9e21b774b76b.png'
                    alt='Comprehensive Lifecycle Data'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <TechnologyLg color='#fff' />,
            title: 'Advanced Technology Integration',
            description: 'Leverage state-of-the-art technologies such as blockchain, QR codes, and RFID for secure, reliable data management',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/8ac929a1d81c887f42beedb3b7fa718e3043e38554b0d601c4099a118a0290d6.png'
                    alt='Advanced Technology Integration'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: 'Enhanced Sustainability',
            description: 'Make informed decisions with insights into materials, sourcing, and environmental impact, driving sustainable practices',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/c94156f4d36a429d1f957a6245cbc09c12bf8a2108c1945069482cedf4528068.png'
                    alt='Enhanced Sustainability'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ConfigureLg color='#fff' />,
            title: 'Regulatory Compliance Made Easy',
            description: 'Stay ahead of the curve with automatic compliance updates, keeping products aligned with the latest regulations',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/97d9bfcb7fdee0256ce22807b339fd0604613ddf8deba9cc6eea56e1a62dba03.png'
                    alt='Regulatory Compliance Made Easy'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <DesignLg color='#fff' />,
            title: 'User-Friendly Interface',
            description: 'Our intuitive platform allows for easy access and analysis of your data, streamlining management processes',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/b36620b05d473d1dbb348d6aee59a634f4121823692142fb9d91744402754932.png'
                    alt='User-Friendly Interface'
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <BarchartLg color='#fff' />,
            title: 'Data-Driven Decision Making',
            description: 'Utilize rich analytics and reports to make strategic decisions, enhancing product’s value and market competitiveness',
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/837b856f991bc7510b970089c2beb4782b318d8301670a676505ff746da890a7.png'
                    alt='Data-Driven Decision Making'
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
