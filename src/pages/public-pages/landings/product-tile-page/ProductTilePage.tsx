import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function ProductTilePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/d3aaa29ee9cf492fab176d2580a5b6ef705f8f9e6cd89fe7c8f9fac5a3c7dfcd.png",
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
                image: "https://upload-file-droplinked.s3.amazonaws.com/23d67ac0dd2bb412d968a453d694e515a48f3b67475e7b19bbb2c7f9c08d6b7f.png",
                title: "Instantly Sell Everywhere",
                description: "Embed product tiles onto blogs, websites or any online platform that turns any space into a storefront."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/98d410044ad2204f49c41dc520d9c0c7d9190ff3922f90a8f2bd698c8ec39241.png",
                title: "Flexible Functionality",
                description: "Use product tiles as a simple purchase button and simplified payment gateway with support for crypto and fiat payments."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/46206556a0781d4bfdb2df0d0640742374a892a5a8b54f398799a242941ec364.png",
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