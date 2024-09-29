import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function ProductTilePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/d3aaa29ee9cf492fab176d2580a5b6ef705f8f9e6cd89fe7c8f9fac5a3c7dfcd.png",
            title: "Embed and Sell Anywhere Effortlessly",
            description: "Easily embed product tiles on any platform and sell directly, without needing coding or complex integrations.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Instant Product Embedding, No code!",
            description: "Generate and embed customizable product tiles across any site, enabling seamless on-page purchases.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Effortless Embedding",
                    description: "Copy and paste the component into your website's source code—no coding skills required."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Seamless On-Page Checkout",
                    description: "Customers stay on the same page during checkout, enhancing the shopping experience."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Customizable Design",
                    description: "Tailor the product tile's design to match your brand's aesthetic perfectly."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/23d67ac0dd2bb412d968a453d694e515a48f3b67475e7b19bbb2c7f9c08d6b7f.png",
                title: "Sell Anywhere, Instantly",
                description: "Embed product tiles into blogs, websites, or any online platform, turning any space into a storefront"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/98d410044ad2204f49c41dc520d9c0c7d9190ff3922f90a8f2bd698c8ec39241.png",
                title: "Flexible Functionality",
                description: "Use product tiles as full purchase buttons or simplified payment gateways with support for crypto and fiat payments"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/46206556a0781d4bfdb2df0d0640742374a892a5a8b54f398799a242941ec364.png",
                title: "Smooth Integration",
                description: "Integrate droplinked products into any project effortlessly, driving sales without disrupting the customer journey"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Component Creation & Embedding", description: "Easily generate and embed product tiles into various platforms, selling directly from any environment." },
                    { title: "Seamless Purchase Flow", description: "Keep customers on the same page while they shop." },
                    { title: "Customizable & Flexible", description: "Customize your product tiles and payment methods, supporting both crypto and fiat payments." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default ProductTilePage