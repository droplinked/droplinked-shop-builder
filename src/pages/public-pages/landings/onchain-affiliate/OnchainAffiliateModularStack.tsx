import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { SoonLg } from 'assets/icons/System/Soon/SoonLg'
import React from 'react'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'

function OnchainAffiliateModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: "Collaborate & Grow",
            description: "Partner with co-sellers to boost product visibility and increase sales to earn more",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Collaborate & Grow' src='https://upload-file-droplinked.s3.amazonaws.com/8b578704d2f9a317f0a0068cc5e96d74adad4272cd396fdceaaa52b3cb3c9e81.png' />
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: "Promote & Earn",
            description: "Select products, submit approval requests and track the status of requests and sales on the go",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Promote & Earn' src='https://upload-file-droplinked.s3.amazonaws.com/3940656e3e595c6d59e4b11fbac744a36060ea16ae6f05201ee6c221594c53a7.png' />
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Collaborate to Sell",
            description: "When approved, products are instantly accessible so you can start promoting and earning better commissions transparently",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Collaborate to Sell' src='https://upload-file-droplinked.s3.amazonaws.com/6bcb307853e9282ae38a0501eeff45f326e602a6dbd13059d738c3a68c7d1ea5.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Create Storefronts",
            description: "Set up a branded store, upload products, activate affiliates and set commission rates in minutes",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Create Storefronts' src='https://upload-file-droplinked.s3.amazonaws.com/c79cb9a3c1472a42a9ea34e4bc3b6b8060455a04106383eedaf9af4cdfbe36dd.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Manage Requests",
            description: "Review and approve co-seller requests inside the affiliate panel to whitelist trusted co-sellers",
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt='Manage Requests' src='https://upload-file-droplinked.s3.amazonaws.com/d60dbd4e81187a6c534b5b7cc63336e9e57c123688216b64ea6ffb2aa5a6ac0b.png' />
        },
        {
            icon: <SoonLg color="#fff" />,
            title: "Getting Started",
            description: "Create a storefront and explore the affiliate panel to find a variety of brand products to instantly add to a shop or product tile",
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt='Getting Started' src='https://upload-file-droplinked.s3.amazonaws.com/4b886aabec7e48e608e3087c07194d4d508f7a24bb12f3909a0d3aa0feee214a.png' />
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

export default OnchainAffiliateModularStack