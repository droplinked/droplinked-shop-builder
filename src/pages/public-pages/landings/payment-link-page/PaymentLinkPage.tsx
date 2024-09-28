import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

export default function PaymentLinkPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/fa16358623ebfea81ea0dfb5a47767c4f91b267eab598cd374d24888cc1818f8.png",
            title: "Seamless Payments, Anytime, Anywhere",
            description: "Create and share direct payment links with ease, offering quick and customizable purchasing experiences for your customers.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Effortless Selling, Maximum Flexibility",
            description: "Generate payment links in seconds and sell across platforms without customers needing to visit your website.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageLink />,
                    title: "Instant Payment Links",
                    description: "Share direct payment URLs or QR codes to enable fast purchases with just a few clicks."
                },
                {
                    icon: <AppIcons.LandingPageDesignNib />,
                    title: "Customizable Payment Pages",
                    description: "Align payment pages with your brand's look, choose dark or light mode, and add product details."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Crypto and Fiat Payments",
                    description: "Offer customers flexible payment options with simple cryptocurrency and traditional currency pricing."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/ca7b3503c5cf08dc3a4f99ba38b65f4acf435940f40def073c2aa0a206531a28.png",
                title: "Sell Anywhere, Anytime",
                description: "Easily share payment links across any platform, making sales wherever your customers are"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/3a25d21896cc42cd6cbe80f627f9d25c0b4a7227f841e4459bebdcfe23a8e857.png",
                title: "No Coding Required",
                description: "Configure payment pages with just a few clicks—no technical skills needed"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/1cc10ef02baaf51c13e7ed4ac8a33407339e582ce20ef536dbb0a414c33895bb.png",
                title: "Streamlined Checkout",
                description: "Simplify the checkout process by collecting only the information you need for digital products"
            }
        ],
        features: [
            { title: "Direct Payment Links & QR Codes", description: "Enable quick, frictionless purchases with shareable payment links and QR codes." },
            { title: "Customizable Experience", description: "Customize payment pages to reflect your brand’s identity, ensuring a cohesive customer experience." },
            { title: "Alternative Payment Methods", description: "Provide cryptocurrency pricing for added flexibility in payment options." }
        ]
    }

    return <LandingPageTemplate data={data} />
}