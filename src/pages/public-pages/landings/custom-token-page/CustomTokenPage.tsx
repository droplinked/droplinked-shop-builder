import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function CustomTokenPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/80b5e5949e046c3d0d7a6216e162907adc89cc800e75ccc07bb1273a05406b4a_or.png",
            title: "True Utility for Custom Tokens",
            description: "Enable custom token payment options that drive utility, usage and value across an ecosystem.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Day 0 Utility",
            description: "Let the community adopt a custom token to purchase products,\n boosting utility and increase the different use cases for how they can add value",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Token-Powered Transactions",
                    description: "Integrate any BRC/ERC/SPL token as a payment method that turns purchases into token-driven transactions."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Boosting Token Utility",
                    description: "Increase a token's usage by making it a viable payment option across any website or app to encourage more adoption."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamless Integration",
                    description: "Easily activate any custom token across properties with droplinkeds’ integration tools—no technical complexity involved when implementing into a website, game or mobile app."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/88db5c843ca6683916d2c110293bf1539bd7da7f89671d178eb609580656c337_or.png",
                title: "Game Developers and Startups",
                description: "Whether you're a game studio or tech company, enhance any token's utility by enabling it as a payment option for fans and customers"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/e877c70387348094408e558d72032f0201dfa3a569d775dfe2168924230d3107_or.png",
                title: "Real Use, Real Value",
                description: "The more utility that it begins to provide, the more the token is used. Give customers a reason to hold and spend the token while the community grows."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/a15a8a870843603461b90656297e51f3e4e0838e63510e915bca3a3654a40a59_or.png",
                title: "Frictionless Payments",
                description: "Provide the community with a seamless way to use the token with smooth and simple custom payment gateway that accepts transactions across any platform."
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Custom Token Payments", description: "Allow customers to use any token to purchase goods and services that boost utility across an ecosystem." },
                    { title: "Better Token Circulation", description: "Increased token usage drives demand and liquidity to further increase utility over time." },
                    { title: "Simple Setup & Integration", description: "Activate custom token payments on any site or property with just a few clicks all within the merchant dashboard, with no need for complex configurations." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default CustomTokenPage