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
            children: <InlineVideoPlayer src='https://upload-file-droplinked.s3.amazonaws.com/c3dd2d77c5c4589b0ee2187b7190b03a4ed39b7bd7f0e8dc979f558b60186a55_or.glb' style={{ width: "max-content" }} />
        },
        {
            title: "Instant Blockchain Payments",
            description: "Accept Stablecoins, Bitcoin, Ethereum, and other cryptocurrencies with zero middlemen",
            gridColumn: { base: '1', md: '1 / -1', lg: '3 / 5' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/c3a1b169f5e16f409900ec0fa9c0ee212ebb0177b7ba8736bc070b359cc3d5c8_or.glb" style={{ width: "max-content" }} />
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
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/e77d073e037bb44f73447cb1c1682eb1479d387e323e0155e91250d926944ef0_or.glb" />
        },
        {
            title: "Numbers That Matter",
            description: "Join our Growing Network of Leading Merchants",
            gridColumn: { base: '1', md: '1', lg: '3 / 4' },
            children: <InlineVideoPlayer src='https://upload-file-droplinked.s3.amazonaws.com/394e29c7d4bf498f00465cb339e2ef75ee508d6542b204d1915acf5643cddcde_or.glb' />
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
