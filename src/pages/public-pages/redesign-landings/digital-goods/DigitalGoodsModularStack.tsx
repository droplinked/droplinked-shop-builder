import { Discount2Lg } from 'assets/icons/Finance/Discount2/Discount2Lg'
import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { AffiliateLg } from 'assets/icons/System/Affiliate/AffiliateLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'

function DigitalGoodsModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <NftLg color="#fff" />,
            title: "Minting Assets",
            description: "Convert art pieces, documents, audio, video and tickets into NFTs to offer within storefronts",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <NetworkLg color="#fff" />,
            title: "Multi-Chain Integration",
            description: "Supporting multiple blockchain networks to offer greater flexibility",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: "Loyalty and Royalty Programs ",
            description: "Maximize earnings and rewards with co-selling and reselling",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <Discount2Lg color="#fff" />,
            title: "Offer Perks, Discounts and Token-Gated Items",
            description: "Grant exclusive access and discounts to customers that are community members",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: "Embeddable Product Tiles",
            description: "Expand reach by distributing inventory across third-party sites, marketplaces and platforms",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <AffiliateLg color="#fff" />,
            title: "Decentralized Affiliate Network",
            description: "Deploying products onchain connects them to the decentralized network, unlocking royalty benefits and more",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
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