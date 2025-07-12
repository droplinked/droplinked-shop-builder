import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SettinggearLg } from 'assets/icons/System/SettingGear/SettinggearLg'
import React from 'react'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'

function ProductTilesModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <GlobeLg color="#fff" />,
            title: "Instantly Sell Everywhere",
            description: "Embed product tiles onto blogs, websites or any online platform that turns any space into a storefront",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Instantly Sell Everywhere' src='https://upload-file-droplinked.s3.amazonaws.com/e426e336161401a8125fe9939a9b6454d0adfebf37ece0221ccedfd3468353a4.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: "Flexible Functionality",
            description: "Use product tiles as a simple purchase button and simplified payment gateway with support for crypto and fiat payments",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Flexible Functionality' src='https://upload-file-droplinked.s3.amazonaws.com/3fad467997c33fd3d8aeb24da13e74ab172556bc87374dba9ed292eeb511326d.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Smooth Integration",
            description: "Integrate droplinkeds’ tools into any project or platform effortlessly to drive sales without disrupting any existing customer journey",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Smooth Integration' src='https://upload-file-droplinked.s3.amazonaws.com/48e8cd7986c782c2319b56f8deab19cae2bd7581342f3a67461bdaa88fbd1129.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: "Component Creation & Embeddables",
            description: "Easily generate and embed product tiles into various platforms to make selling directly from any environment incredibly simple",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Component Creation & Embeddables' src='https://upload-file-droplinked.s3.amazonaws.com/0c64efdf6ee730643dc82f4b8d80f15393ced1bee22688b49ce2488480bfb3de.png' />
        },
        {
            icon: <Layout2Lg color="#fff" />,
            title: "Seamless Purchase Flows",
            description: "Keep customers on the same page while they browse and checkout",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Seamless Purchase Flows' src='https://upload-file-droplinked.s3.amazonaws.com/4bac5ff94f69a810635efba919063aa85e2f68b5bf95074aa44c5b25c3ce3403.png' />
        },
        {
            icon: <SettinggearLg color="#fff" />,
            title: "Customizable, Flexible Components",
            description: "Customize product tiles and payment methods to support both crypto and fiat payments",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Customizable, Flexible Components' src='https://upload-file-droplinked.s3.amazonaws.com/c0d8bae6b8fb2fc1e00b903d7da3cfff42cb02870fa51388f5fbb2028b6b747e.png' />
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

export default ProductTilesModularStack