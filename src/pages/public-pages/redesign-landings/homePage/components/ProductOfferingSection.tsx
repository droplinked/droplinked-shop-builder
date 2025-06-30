import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import React from 'react'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Products from '../svgs/Products'

export default function ProductOfferingSection() {
    const headingSubtitle = `droplinked supports a wide variety of inventory, from digital goods, physical items,
    merchandise and digital IP. Whether an artist, creator, or enterprise retailer, the
    technology helps easily manage physical and digital inventory and increase margins`

    const cardsData: CardData[] = [
        {
            icon: <PositionLg color='#fff' />,
            title: "Services",
            description: "Offer skills like consulting, design work, and more with onchain automation",
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/2d590fabf845f1755d39c1f521b7abf37fa8fd253d15e826c02ad95e15d1d22b_or.webm" />
        },
        {
            icon: <ImageLg color='#fff' />,
            title: "Physical Products",
            description: "Manage inventory and sales with secure blockchain-backed transactions",
            gridColumn: { base: '1', md: '1', lg: '3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/a8446a148de62ba284980a767f7284acc55e8a63d8955fc55f4271ed969a8a7e_or.webm" />
        },
        {
            icon: <BoxLg color='#fff' />,
            title: "Digital Products",
            description: "Offer eBooks, online courses, software, and more with easy distribution",
            gridColumn: { base: '1', md: '2', lg: '1' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/dd38f4a712c8f68e8375dd70bc92951c9a903dc49ad93bfcb6901bb0126079cd_or.webm" />
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "POD and NFT's - Mint to MerchTM",
            description: "Create and sell unique items using digital art, collectibles, and other blockchain-based items",
            gridColumn: { base: '1', md: '1 / -1', lg: '2 / 4' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/3aca27f1be4b8c9a86b30f7a4648f6d40b70e28b6dd4f76213be8ed793f5603a_or.webm" />
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='PRODUCT OFFERINGS'
            headingTitle='Sell Across Any Vertical'
            headingSubtitle={headingSubtitle}
            typographySvg={<Products />}
        >
            <Cards
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}
