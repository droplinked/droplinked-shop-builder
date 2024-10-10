import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

export default function PaymentLinkPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/fa16358623ebfea81ea0dfb5a47767c4f91b267eab598cd374d24888cc1818f8.png",
            title: "Seamless Payments Anytime, Anywhere",
            description: "Create and share direct payment links with ease, offering a quick and simple purchase experience within a couple of clicks.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Sell Effortlessly with Maximum Flexibility",
            description: "Generate payment links in seconds to sell anywhere without customers needing to visit your site or app",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageLink />,
                    title: "Instant Payment Links",
                    description: "Share URLs or QR codes to enable fast purchases for items or invoices within just a few clicks."
                },
                {
                    icon: <AppIcons.LandingPageDesignNib />,
                    title: "Customizable Payment Pages",
                    description: "Create payment pages align with your look, and choose between dark and light modes while customizing product details to display."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Crypto And Fiat Payments",
                    description: "Offer customers flexible payment options with a wide range of cryptocurrencies alongside traditional payment methods."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/ca7b3503c5cf08dc3a4f99ba38b65f4acf435940f40def073c2aa0a206531a28.png",
                title: "Sell Anywhere, Anytime",
                description: "Generate traffic and sales from wherever customers are by easily sharing payment links across any platform"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/3a25d21896cc42cd6cbe80f627f9d25c0b4a7227f841e4459bebdcfe23a8e857.png",
                title: "No Coding Required",
                description: "Configure payment pages all within a few clicks, no technical skills are required"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/1cc10ef02baaf51c13e7ed4ac8a33407339e582ce20ef536dbb0a414c33895bb.png",
                title: "Streamlined Checkout",
                description: "Simplified checkout flows for customers making payments a breeze by only collecting the basic information you need"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Direct Payment Links & QR Codes", description: "Enable quick, frictionless purchases with shareable payment links and QR codes." },
                    { title: "Customizable Experience", description: "Customize payment pages to reflect your brand’s identity, ensuring a cohesive customer experience." },
                    { title: "Alternative Payment Methods", description: "Accept cryptocurrencies pegged to stable coins to add more flexibility for customers during checkout." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}