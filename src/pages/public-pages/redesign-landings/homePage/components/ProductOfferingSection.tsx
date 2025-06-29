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
import DigitalProductVideo from '../videos/digital-products.webm'
import PhysicalProductsVideo from '../videos/physical-products.webm'
import PODVideo from '../videos/pod.webm'
import ServicesVideo from '../videos/services.webm'

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
            children: <InlineVideoPlayer src={ServicesVideo} />
        },
        {
            icon: <ImageLg color='#fff' />,
            title: "Physical Products",
            description: "Manage inventory and sales with secure blockchain-backed transactions",
            gridColumn: { base: '1', md: '1', lg: '3' },
            children: <InlineVideoPlayer src={PhysicalProductsVideo} />
        },
        {
            icon: <BoxLg color='#fff' />,
            title: "Digital Products",
            description: "Offer eBooks, online courses, software, and more with easy distribution",
            gridColumn: { base: '1', md: '2', lg: '1' },
            children: <InlineVideoPlayer src={DigitalProductVideo} />
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "POD and NFT's - Mint to MerchTM",
            description: "Create and sell unique items using digital art, collectibles, and other blockchain-based items",
            gridColumn: { base: '1', md: '1 / -1', lg: '2 / 4' },
            children: <InlineVideoPlayer src={PODVideo} />
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
