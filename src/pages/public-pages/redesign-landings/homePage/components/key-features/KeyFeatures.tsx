import { Box } from '@chakra-ui/react'
import React from 'react'
import { Cards } from '../../../_shared/components/card'
import { CardData } from '../../../_shared/components/card/Cards'
import InlineVideoPlayer from '../../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import KeyFeaturesTypography from '../../svgs/KeyFeaturesTypography'
import Charts from './Charts'

export default function KeyFeatures() {
    const headingSubtitle = `droplinked offers easy to use digital tools, providing powerful features
    for any seller or business to accelerate global commerce at scale`

    const doubleCards: CardData[] = [
        {
            title: "Onchain Product Registration",
            description: "Register inventory on the blockchain for full accountability and security",
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' },
            children: <InlineVideoPlayer src='/assets/video/home-page/product-registration.webm' style={{ width: "max-content" }} />
        },
        {
            title: "Instant Blockchain Payments",
            description: "Accept Stablecoins, Bitcoin, Ethereum, and other cryptocurrencies with zero middlemen",
            gridColumn: { base: '1', md: '1 / -1', lg: '3 / 5' },
            children: <InlineVideoPlayer src="/assets/video/home-page/blockchainpayment.webm" style={{ width: "max-content" }} />
        }
    ]

    const tripleCards: CardData[] = [
        {
            title: "Transparent Fees, No Limits",
            description: "Sell freely with no hidden fees or restrictions – own the data and profits while knowing exactly how earnings are distributed with partners",
            gridColumn: { base: '1', md: '1', lg: '1 / 2' },
            children: <Charts />
        },
        {
            title: "Community-Driven",
            description: "Engage with a vibrant, global community of buyers and sellers",
            gridColumn: { base: '1', md: '2', lg: '2 / 3' },
            children: <InlineVideoPlayer src="/assets/video/home-page/community.webm" />
        },
        {
            title: "Numbers That Matter",
            description: "Join our Growing Network of Leading Merchants",
            gridColumn: { base: '1', md: '1', lg: '3 / 4' },
            children: <InlineVideoPlayer src='/assets/video/home-page/numbers.webm' />
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
                flexDirection='column-reverse'
                hasGradiantOverlay={true}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }}
            />

            <Box marginTop={{ base: 4, "2xl": 6 }}>
                <Cards
                    cardsData={tripleCards}
                    flexDirection='column-reverse'
                    hasGradiantOverlay={true}
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
