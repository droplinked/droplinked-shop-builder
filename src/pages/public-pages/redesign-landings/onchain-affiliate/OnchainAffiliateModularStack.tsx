import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { SoonLg } from 'assets/icons/System/Soon/SoonLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'

function OnchainAffiliateModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: "Collaborate & Grow",
            description: "Partner with co-sellers to boost product visibility and increase sales to earn more",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: "Promote & Earn",
            description: "Select products, submit approval requests and track the status of requests and sales on the go",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Collaborate to Sell",
            description: "When approved, products are instantly accessible so you can start promoting and earning better commissions transparently",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Create Storefronts",
            description: "Set up a branded store, upload products, activate affiliates and set commission rates in minutes",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Manage Requests",
            description: "Review and approve co-seller requests inside the affiliate panel to whitelist trusted co-sellers",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <SoonLg color="#fff" />,
            title: "Getting Started",
            description: "Create a storefront and explore the affiliate panel to find a variety of brand products to instantly add to a shop or product tile",
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

export default OnchainAffiliateModularStack