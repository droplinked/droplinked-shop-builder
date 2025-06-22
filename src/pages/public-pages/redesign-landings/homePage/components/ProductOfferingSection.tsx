import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import Lottie from 'lottie-react'
import { Cards } from 'pages/public-pages/redesign-landings/components/card'
import React from 'react'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import DigitalProduct from '../lottie/product-offering/DigitalProducts.json'
import PhysicalProducts from '../lottie/product-offering/PhysicalProducts.json'
import POD from '../lottie/product-offering/POD.json'
import Services from '../lottie/product-offering/Services.json'

export default function ProductOfferingSection() {
    const headingSubtitle = `droplinked supports a wide variety of inventory, from digital goods, physical items,
    merchandise and digital IP. Whether an artist, creator, or enterprise retailer, the
    technology helps easily manage physical and digital inventory and increase margins`

    const cardsData = [
        {
            icon: <PositionLg color='#fff' />,
            title: "Services",
            description: "Offer skills like consulting, design work, and more with onchain automation",
            animation: <Lottie animationData={Services} />,
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' }
        },
        {
            icon: <ImageLg color='#fff' />,
            title: "Physical Products",
            description: "Manage inventory and sales with secure blockchain-backed transactions",
            animation: <Lottie animationData={PhysicalProducts} />,
            gridColumn: { base: '1', md: '1', lg: '3' }
        },
        {
            icon: <BoxLg color='#fff' />,
            title: "Digital Products",
            description: "Offer eBooks, online courses, software, and more with easy distribution",
            animation: <Lottie animationData={DigitalProduct} />,
            gridColumn: { base: '1', md: '2', lg: '1' }
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "POD and NFT's - Mint to MerchTM",
            description: "Create and sell unique items using digital art, collectibles, and other blockchain-based items",
            animation: <Lottie animationData={POD} />,
            gridColumn: { base: '1', md: '1 / -1', lg: '2 / 4' }
        }
    ];

    return (
        <SectionContainer
            icon='story'
            sectionTitle='PRODUCT OFFERINGS'
            headingTitle='Sell Across Any Vertical'
            headingSubtitle={headingSubtitle}
            typographyText='Products'
        >
            <Cards cardsData={cardsData} />
        </SectionContainer>
    )
}
