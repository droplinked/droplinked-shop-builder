import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { DeliverytruckLg } from 'assets/icons/System/DeliveryTruck/DeliverytruckLg'
import React from 'react'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'

function ProductsOnDemandModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <PositionLg color="#fff" />,
            title: "More than +10K Items to Customize",
            description: "Explore high quality merchandise blanks customizable and ready to sell on-demand",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/66e8e21c6fff912f2bb80241c730c9e0922f4f0930fe054f09c6e6edb213ed33.png' />
        },
        {
            icon: <DeliverytruckLg color="#fff" />,
            title: "Automated Shipping and Fulfilment",
            description: "Hassle-free shipping and fulfillment, everything is handled on your behalf",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Automated Shipping and Fulfilment' src='https://upload-file-droplinked.s3.amazonaws.com/c3c4171fdd51f514d68269e05010f233b488d93959be27308aa53968933f7046.png' />
        },
        {
            icon: <PositionLg color="#fff" />,
            title: "Mint to Merch",
            description: "Empower community members to design merchandise with exclusive designs or NFT artwork they own",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/85e77cd08d1703650ddf87c4841d9403a2e01e1bb456ab0ffe9a46b3354790a4.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: "Offer Perks, Discounts and Token-Gated Items",
            description: "Grant exclusive access and discounts to customers that are community members ",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Offer Perks, Discounts and Token-Gated Items' src='https://upload-file-droplinked.s3.amazonaws.com/f2511d193573eab6db67d1e08574c601dcce953181a3ac38097aee0361b7c0f7.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: "Embeddable Product Tiles",
            description: "Expand reach by distributing inventory across third-party sites, marketplaces and platforms",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Embeddable Product Tiles' src='https://upload-file-droplinked.s3.amazonaws.com/add4930cd84e9ffdfe6e1149a5eabbbd885c871a4647f2fab5040f361ed81ab0.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: "Decentralized Affiliate Network",
            description: "Deploying products onchain connects them to the decentralized network, unlocking royalty benefits and more",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Decentralized Affiliate Network' src='https://upload-file-droplinked.s3.amazonaws.com/519161d65a791400d307ff0747c5108f23c4a152d1e2497c48752df8a5533e0e.png' />
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

export default ProductsOnDemandModularStack