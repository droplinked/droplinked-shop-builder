import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

export default function PaymentLinkPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/6c4f2ff19d7bdcd9f664254195647e74714ee7032cf60ccfaffb4d13484ca8c1_or.png",
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
                image: "https://upload-file-droplinked.s3.amazonaws.com/b76297471777e5f38afe1e7bde7e25e04731557547814ad788e64f52d947dc79_or.png",
                title: "Sell Anywhere, Anytime",
                description: "Generate traffic and sales from wherever customers are by easily sharing payment links across any platform"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/4e30d441479c64c0fe1a24a84079683e0d39fd73ae1321a308f6a3847c40cfb4_or.png",
                title: "No Coding Required",
                description: "Configure payment pages all within a few clicks, no technical skills are required"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/ec103f93a5cf04ced2952940a47783bda566de1e7b1b587cbac41039ee1d2cd1_or.png",
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