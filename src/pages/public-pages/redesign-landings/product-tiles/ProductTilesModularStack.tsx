import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SettinggearLg } from 'assets/icons/System/SettingGear/SettinggearLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'

function ProductTilesModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <GlobeLg color="#fff" />,
            title: "Instantly Sell Everywhere",
            description: "Embed product tiles onto blogs, websites or any online platform that turns any space into a storefront",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/49f43950da54190be0f48855598789155a36a5a2fea8cf5d98f4b3c6aedf18cc.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: "Flexible Functionality",
            description: "Use product tiles as a simple purchase button and simplified payment gateway with support for crypto and fiat payments",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Smooth Integration",
            description: "Integrate droplinkeds’ tools into any project or platform effortlessly to drive sales without disrupting any existing customer journey",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: "Component Creation & Embeddables",
            description: "Easily generate and embed product tiles into various platforms to make selling directly from any environment incredibly simple",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <Layout2Lg color="#fff" />,
            title: "Seamless Purchase Flows",
            description: "Keep customers on the same page while they browse and checkout",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <img width="100%" height="100%" alt='products-icons' src='https://upload-file-droplinked.s3.amazonaws.com/3dde6acd17201deac931f01af2fc6959161021afcd23697727b7042ee79489f2.png' />
        },
        {
            icon: <SettinggearLg color="#fff" />,
            title: "Customizable, Flexible Components",
            description: "Customize product tiles and payment methods to support both crypto and fiat payments",
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

export default ProductTilesModularStack