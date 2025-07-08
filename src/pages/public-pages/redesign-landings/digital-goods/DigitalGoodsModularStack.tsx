import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'

function DigitalGoodsModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <NftLg color="#fff" />,
            title: "Minting Assets",
            description: "Convert art pieces, documents, audio, video and tickets into NFTs to offer within storefronts",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt='Minting Assets' src='https://upload-file-droplinked.s3.amazonaws.com/a45bbbeb609a3ad1da38e1d71f032ff7daa21735f0b48ed4529c891e7db5a133.png' />
        },
        {
            icon: <NetworkLg color="#fff" />,
            title: "Multi-Chain Integration",
            description: "Supporting multiple blockchain networks to offer greater flexibility",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt='Multi-Chain Integration' src='https://upload-file-droplinked.s3.amazonaws.com/9b35f5190d0201952439d21563b7c76c565626b5cb310502d50d2395cfd883b5.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: "Loyalty and Royalty Programs",
            description: "Maximize earnings and rewards with co-selling and reselling",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt='Loyalty and Royalty Programs' src='https://upload-file-droplinked.s3.amazonaws.com/129c36c0dacd7293e40152061a4fe130f7cb7fd8828ad2b08122bb508c1f989e.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: "Offer Perks, Discounts and Token-Gated Items",
            description: "Grant exclusive access and discounts to customers that are community members",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt='Offer Perks, Discounts and Token-Gated Items' src='https://upload-file-droplinked.s3.amazonaws.com/f2511d193573eab6db67d1e08574c601dcce953181a3ac38097aee0361b7c0f7.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: "Embeddable Product Tiles",
            description: "Expand reach by distributing inventory across third-party sites, marketplaces and platforms",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt='Embeddable Product Tiles' src='https://upload-file-droplinked.s3.amazonaws.com/add4930cd84e9ffdfe6e1149a5eabbbd885c871a4647f2fab5040f361ed81ab0.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: "Decentralized Affiliate Network",
            description: "Deploying products onchain connects them to the decentralized network, unlocking royalty benefits and more",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt='Decentralized Affiliate Network' src='https://upload-file-droplinked.s3.amazonaws.com/519161d65a791400d307ff0747c5108f23c4a152d1e2497c48752df8a5533e0e.png' />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}

export default DigitalGoodsModularStack