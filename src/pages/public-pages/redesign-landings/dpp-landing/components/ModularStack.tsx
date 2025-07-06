import { Refresh1Lg } from 'assets/icons/Action/Refresh1/Refresh1Lg'
import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TechnologyLg } from 'assets/icons/System/Technology/TechnologyLg'
import React from 'react'
import { CardData } from '../../_shared/components/card/Cards'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'

export default function ModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <Refresh1Lg color='#fff' />,
            title: 'Comprehensive Lifecycle Data',
            description: 'Capture and access detailed information from production to disposal, ensuring full lifecycle traceability',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/b4aa220afdf913386a2fcfd11dc2b6a96afd1afce8ec258d6ccbf1c86bcb9f52.png'
                    alt='Comprehensive Lifecycle Data'
                    width="100%"
                    style={{ objectFit: "cover" }}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <TechnologyLg color='#fff' />,
            title: 'Advanced Technology Integration',
            description: 'Leverage state-of-the-art technologies such as blockchain, QR codes, and RFID for secure, reliable data management',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/70e949bf3c05b9c49b44a4e15b34276eabe3b2fb9c10e6f2022d4219f10f454d.png'
                    alt='Advanced Technology Integration'
                    width="100%"
                    style={{ objectFit: "cover" }}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: 'Enhanced Sustainability',
            description: 'Make informed decisions with insights into materials, sourcing, and environmental impact, driving sustainable practices',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/fd06fa4343bc6c3dd2309f6e27b483ee4707ad56ff729bc6f53a863a8c31eac6.png'
                    alt='Enhanced Sustainability'
                    width="100%"
                    style={{ objectFit: "cover" }}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ConfigureLg color='#fff' />,
            title: 'Regulatory Compliance Made Easy',
            description: 'Stay ahead of the curve with automatic compliance updates, keeping products aligned with the latest regulations',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/4adbd7578e6c7f9bbd58f50c1bf52b75a42040c6e102222b791c4feb4159b223.png'
                    alt='Regulatory Compliance Made Easy'
                    width="100%"
                    style={{ objectFit: "cover" }}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <DesignLg color='#fff' />,
            title: 'User-Friendly Interface',
            description: 'Our intuitive platform allows for easy access and analysis of your data, streamlining management processes',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/acd027cae2c42ef004cff1fb8dbe3e65142fe7976a41e67cd0b6ba5d25875952.png'
                    alt='User-Friendly Interface'
                    width="100%"
                    style={{ objectFit: "cover" }}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <BarchartLg color='#fff' />,
            title: 'Data-Driven Decision Making',
            description: 'Utilize rich analytics and reports to make strategic decisions, enhancing product’s value and market competitiveness',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/bb080a0e85d50b81a3023a50194e7269f827d6bcc89cfa60e3ff0325e5001a98.png'
                    alt='Data-Driven Decision Making'
                    width="100%"
                    style={{ objectFit: "cover" }}
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
