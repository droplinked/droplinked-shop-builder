import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function AffiliatePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/d2b7a187744a39f4b679c8b5991c2386bbee4670b5ad95a6f9f2098be290c36e.png",
            title: "Transparent commerce to earn the most from every sale",
            description: "Unlock new opportunities as a merchant or co-seller with the latest onchain technology. As a community-driven platform, droplinked empowers anyone with the tools needed to earn more on every sale while getting paid faster.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Transparent Attribution from Point of Production to Point of Sale",
            description: "Earn affiliate commissions effortlessly with smart contracts, eliminating the need for trust between partners.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Automated Distributions",
                    description: "Earnings and commissions are processed and distributed automatically, eliminating the legacy processes and manual steps typically used on merchant networks today."
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
                image: "https://upload-file-droplinked.s3.amazonaws.com/70d19afed26f8ee609c162ee9f04a908ebde6f91ea8933d452ef5f2dc7793fe6.png",
                title: "Merchant Benefits",
                description: [
                    { boldText: "Expand reach", rest: "by connecting with trusted co-sellers you whitelist to access inventory" },
                    { boldText: "Track sales and performance", rest: "in real-time with comprehensive analytics on first and ongoing sales" },
                    { boldText: "Automatic commission payouts", rest: "ensure smooth, hassle-free transactions for every sale that is made" }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/32a1b8030634cb50dea0865d693c9cea176e03394657192f091510f71e5478bf.png",
                title: "Co-selling Benefits",
                description: [
                    { boldText: "Easily discover and promote", rest: "products based on personalized offers made by merchants" },
                    { boldText: "Create customizable storefronts", rest: "or product embeddable tiles to showcase and sell products more effectively on any property or social channel" },
                    { boldText: "Earn commissions", rest: "instantly on every successful sale made based on merchant terms" }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/967845604ed02d8c12b5cb16ad8d5138fdf8a26345658848dcfed024341cf7e3.png",
                title: "Easy Setup",
                description: "Begin your affiliate marketing journey in no time without any coding needed. Simply customize your preferred settings on your account and let the system do the rest."
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
                title: "Co-selling Features",
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

export default AffiliatePage