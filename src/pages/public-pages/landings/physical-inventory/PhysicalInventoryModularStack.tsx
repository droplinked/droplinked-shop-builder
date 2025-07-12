import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { DeliverytruckLg } from 'assets/icons/System/DeliveryTruck/DeliverytruckLg'
import React from 'react'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'

function PhysicalInventoryModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: "Manage Inventory Onchain",
            description: "Digitize and manage catalogues with blockchain-integrated tools",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Manage Inventory Onchain' src='https://upload-file-droplinked.s3.amazonaws.com/e2d199ea0e8487fd77faedf45b8f6d9ad22a014b692d2dce14a8a4efbcc863a0.png' />
        },
        {
            icon: <DeliverytruckLg color="#fff" />,
            title: "Automated Shipping and Fulfilment",
            description: "Simplify shipping and fulfillment processes with our third-party shipping services",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Automated Shipping and Fulfilment' src='https://upload-file-droplinked.s3.amazonaws.com/c3c4171fdd51f514d68269e05010f233b488d93959be27308aa53968933f7046.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Warehouse Management",
            description: "WMS streamlines shipping, boosts accuracy and cuts costs to ensure customer satisfaction",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Warehouse Management' src='https://upload-file-droplinked.s3.amazonaws.com/fdf0945ecca1cc5e3aaa6ca968efa13bfe912e7a844c1b9a46a8cf4d2056ec4b.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: "Offer Perks, Discounts and Token-Gated Items",
            description: "Grant exclusive access and discounts to customers that are community members",
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

export default PhysicalInventoryModularStack