import { Grid } from '@chakra-ui/react'
import React from 'react'
import ProductOfferingCard from './ProductOfferingCard'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import Lottie from 'lottie-react'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import DigitalProduct from '../../lottie/product-offering/DigitalProducts.json'
import PhysicalProducts from '../../lottie/product-offering/PhysicalProducts.json'
import POD from '../../lottie/product-offering/POD.json'
import Services from '../../lottie/product-offering/Services.json'


export default function CardsGrid() {
    const cardsData = [
        {
            icon: <PositionLg color='#fff' />,
            title: "Services",
            description: "Offer skills like consulting, design work, and more with onchain automation",
            animation: Services,
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' }
        },
        {
            icon: <ImageLg color='#fff' />,
            title: "Physical Products",
            description: "Manage inventory and sales with secure blockchain-backed transactions",
            animation: PhysicalProducts,
            gridColumn: { base: '1', md: '1', lg: '3' }
        },
        {
            icon: <BoxLg color='#fff' />,
            title: "Digital Products",
            description: "Offer eBooks, online courses, software, and more with easy distribution",
            animation: DigitalProduct,
            gridColumn: { base: '1', md: '2', lg: '1' }
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: "POD and NFT's - Mint to MerchTM",
            description: "Create and sell unique items using digital art, collectibles, and other blockchain-based items",
            animation: POD,
            gridColumn: { base: '1', md: '1 / -1', lg: '2 / 4' }
        }
    ];

    return (
        <Grid
            templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
            }}
            gap={6}
        >
            {cardsData.map((card, index) => (
                <ProductOfferingCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    animation={<Lottie animationData={card.animation} />}
                    gridColumn={card.gridColumn}
                />
            ))}
        </Grid>
    )
}
