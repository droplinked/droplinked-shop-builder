import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function Affiliate() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/4bf3354ca17f51fc16f09c39d7b1e48d56c066892c9ff947c0af83326153630c.png",
            title: "Transparent commerce to earn the most from every sale",
            description: "Unlock new opportunities as a merchant or co-seller with the latest onchain technology. As a community-driven platform, droplinked empowers anyone with the tools needed to earn more on every sale while getting paid faster.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Transparent Attribution From Point of Production to Point of Sale",
            description: "Earn affiliate commissions effortlessly with smart contracts, eliminating the need for trust between partners.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Automated Distributions",
                    description: "Earnings and commissions are processed and distributed automatically, eliminating the legacy processes and manual steps typically used on merchant networks today. "
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Transparent Transactions",
                    description: "Leverage the power of blockchain technology to ensure full transparency. All transactions are recorded on-chain, providing tamper-proof operations for both brands and co-sellers."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Direct Settlements",
                    description: "Enjoy instant, direct payouts on each sale. Whitelisted co-sellers receive commissions immediately without any intermediaries so that you can pay them the most."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/650df9ac5fa7e05854ade840474e6fdaa44b56eb490cc819afc050bb50d0d653.png",
                title: "Merchant Benefits",
                description: [
                    { boldText: "Expand reach", rest: "by connecting with trusted co-sellers you whitelist to access inventory" },
                    { boldText: "Track sales and performance", rest: "in real-time with comprehensive analytics on first and ongoing sales" },
                    { boldText: "Automatic commission payouts", rest: "ensure smooth, hassle-free transactions for every sale that is made" }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/74a595f41e38b4da60d2e46c82c20460d964949d3f13cf01c30a41ac99f193f9.png",
                title: "Co-Selling Benefits",
                description: [
                    { boldText: "Easily discover and promote", rest: "products based on personalized offers made by merchants" },
                    { boldText: "Create customizable storefronts", rest: "or product embeddable tiles to showcase and sell products more effectively on any property or social channel" },
                    { boldText: "Earn commissions", rest: "instantly on every successful sale made based on merchant terms" }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/5ce553d6ee2d9024d844f08f0779dcb874d506bb9aeabd38ef6b55e43bb9d5eb.png",
                title: "Easy Setup",
                description: "Begin your affiliate marketing journey in no time without any coding needed. Simply customize your preferred settings on your account and let the system do the rest"
            }
        ],
        featureGroups: [
            {
                title: "Merchant Features",
                features: [
                    { title: "Create Storefronts", description: "Set up a branded store, upload products, activate affiliates and set commission rates in minutes" },
                    { title: "Manage Requests", description: "Review and approve co-seller requests inside the affiliate panel to whitelist trusted co-sellers" },
                    { title: "Collaborate & Grow", description: "Partner with co-sellers to boost product visibility and increase sales to earn more" }
                ]
            },
            {
                title: "Co-Selling Features",
                features: [
                    { title: "Getting Started", description: "Create a storefront and explore the affiliate panel to find a variety of brand products to instantly add to a shop or product tile" },
                    { title: "Promote & Earn", description: "Select products, submit approval requests and track the status of requests and sales on the go" },
                    { title: "Collaborate to Sell", description: "When approved, products are instantly accessible so you can start promoting and earning better commissions transparently." }
                ]
            },
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default Affiliate