import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function CustomTokenPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/92e73c26229520df01d80732f877ca364db71af706c714ff5ed7fc35f6b70fc5.png",
            title: "Unlock the Power of Custom Tokens",
            description: "Enable your custom Web3 token as a payment option, driving usage and increasing its value across your ecosystem.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Monetize with Your Own Token",
            description: "Let customers use your custom token to purchase products, boosting token utility and market value.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Token-Powered Transactions",
                    description: "Integrate your Web3 token as a payment method, turning every purchase into a token-driven transaction."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Boost Token Utility",
                    description: "Increase your token's usage by making it a viable payment option across your website, encouraging more transactions."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamless Integration",
                    description: "Easily activate your custom token on your site with our integration tools—no technical complexity involved."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/1afc5895dd26fee7f24ac9aa99d94491f1406eaa385d82d990b5811a42136b6f.png",
                title: "For Game Developers and Startups",
                description: "Whether you're a game studio or a Web3 startup, enhance your token's utility by enabling it as a payment option for your customers"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/9b024430190768e9dc273b755659c6cf4d874381f082befa784ee74d116d3591.png",
                title: "Increase Token Value",
                description: "The more your token is used, the higher its value climbs. Give customers a reason to hold and spend your token"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/8ff199fc0ea6731799587c1255cee77adb21aa086207f815dc8b48672b5d539e.png",
                title: "Frictionless Payments",
                description: "Provide your community with a seamless way to use your token, ensuring smooth and simple transactions on your platform"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Custom Token Payments", description: "Allow customers to use your unique Web3 token to purchase goods, boosting its utility within your ecosystem." },
                    { title: "Higher Token Circulation", description: "Increased token usage drives demand and liquidity, helping raise the token’s market value over time." },
                    { title: "Simple Setup & Integration", description: "Activate custom token payments on your site with just a few clicks, with no need for complex configurations.Like this comment" }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default CustomTokenPage