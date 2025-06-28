import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import React from 'react'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import KeyFeaturesTypography from '../svgs/KeyFeaturesTypography'
import ProductRegistration from '../videos/product-registration.webm'
import BlockchainPayment from '../videos/blockchainpayment.webm'
import Chart1 from '../videos/chart1.webm'
import Chart2 from '../videos/chart2.webm'
import Community from '../videos/community.webm'
import Numbers from '../videos/numbers.webm'
import { Box } from '@chakra-ui/react'

export default function KeyFeatures() {
    const headingSubtitle = `droplinked offers easy to use digital tools, providing powerful features
    for any seller or business to accelerate global commerce at scale`

    const doubleCards: CardData[] = [
        {
            icon: <PositionLg color='#fff' />,
            title: "Onchain Product Registration",
            description: "Register inventory on the blockchain for full accountability and security",
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' },
            children: <InlineVideoPlayer src={ProductRegistration} style={{ width: "max-content" }} />
        },
        {
            icon: <ImageLg color='#fff' />,
            title: "Instant Blockchain Payments",
            description: "Accept Stablecoins, Bitcoin, Ethereum, and other cryptocurrencies with zero middlemen",
            gridColumn: { base: '1', md: '1 / -1', lg: '3 / 5' },
            children: <InlineVideoPlayer src={BlockchainPayment} style={{ width: "max-content" }} />
        }
    ]

    const tripleCards: CardData[] = [
        {
            icon: <BoxLg color='#fff' />,
            title: "Transparent Fees, No Limits",
            description: "Sell freely with no hidden fees or restrictions – own the data and profits while knowing exactly how earnings are distributed with partners",
            gridColumn: { base: '1', md: '1', lg: '1 / 2' },
            children: <InlineVideoPlayer src={Chart1} loop={false} />
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "Community-Driven",
            description: "Engage with a vibrant, global community of buyers and sellers",
            gridColumn: { base: '1', md: '2', lg: '2 / 3' },
            children: <InlineVideoPlayer src={Community} />
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "Numbers That Matter",
            description: "Join our Growing Network of Leading Merchants",
            gridColumn: { base: '1', md: '1', lg: '3 / 4' },
            children: <InlineVideoPlayer src={Numbers} />
        }
    ]

    return (
        <SectionContainer
            icon='layer'
            sectionTitle='DROPLINKED KEY FEATURES'
            headingTitle='Onchain Commerce'
            headingSubtitle={headingSubtitle}
            typographySvg={<KeyFeaturesTypography />}
        >
            <Cards
                cardsData={doubleCards}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }}
            />

            <Box marginTop={{ base: 4, "2xl": 6 }}>
                <Cards
                    cardsData={tripleCards}
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    }}
                />
            </Box>
        </SectionContainer>
    )
}
