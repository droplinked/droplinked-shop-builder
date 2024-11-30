import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function ProductTilePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/42f9efc9a24934b427005ef43e1e75c38a92e5e752bda75a930b873d572d8283_or.png",
            title: "Embed and Sell Anywhere",
            description: "Easily create product tiles to share across any platform to sell directly, no complex integrations or coding required.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Full Functionality Everywhere",
            description: "Generate and embed customizable product tiles across any site, enabling seamless purchases anywhere online",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Effortless Embeddable",
                    description: "Copy and paste the component into your website's source code to create a seamless experience for your customers."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Seamless Checkout",
                    description: "Customers stay on the same page during the checkout experience to keep things cohesive and consistent."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Customizable Designs",
                    description: "Tailor the product tile design to match your brand's aesthetic, look and feel."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/0f1e603c9754eab3dd8d5a5b5f8a9c8d0a6f2de5c9ee70184691ca3012e24bc8_or.png",
                title: "Instantly Sell Everywhere",
                description: "Embed product tiles onto blogs, websites or any online platform that turns any space into a storefront."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/f6293c4f44ae1b4af7be12033ac41c54263a56bb23010a533530208a23e457a9_or.png",
                title: "Flexible Functionality",
                description: "Use product tiles as a simple purchase button and simplified payment gateway with support for crypto and fiat payments."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/450df138917ce5ed98a90438ab38c3a87129d91d341c7cfff3011a19bf2c7303_or.png",
                title: "Smooth Integration",
                description: "Integrate droplinkeds’ tools into any project or platform effortlessly to drive sales without disrupting any existing customer journey."
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Component Creation & Embeddables", description: "Easily generate and embed product tiles into various platforms to make selling directly from any environment incredibly simple." },
                    { title: "Seamless Purchase Flows", description: "Keep customers on the same page while they browse and checkout." },
                    { title: "Customizable, Flexible Components", description: "Customize product tiles and payment methods to support both crypto and fiat payments." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default ProductTilePage