import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function TokenizingProductsPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/2344fa8e1a4cf393e62bed5a458ed9543c31dff85d02cba30fb0994405a1d43c.png",
            title: "Better Attribution for Inventory",
            description: "Leverage onchain technology to tokenize inventory ensuring ownership and transparency while unlocking working capital for the business.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "No-Code Tools to Tokenize Inventory",
            description: "Create digital records of inventory and assets onchain to ensure secure and transparent distribution and trading",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Blockchain Backed Ownership",
                    description: "Transform goods into tokenized assets that are secured onchain for tamper-proof ownership."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Simplifying Tokenization",
                    description: "Easily tokenize luxury collectibles, physical items and other assets with NFT technology that enables custody ownership for distribution."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Global Trading & Liquidity",
                    description: "Unlock new global markets by making tokenized inventory tradable, increasing liquidity and reach with value-add partners and businesses."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/3f9b272c6436e721fed899d9dec680d05a7bb657e65bb2328e49ff5811359b4b.png",
                title: "Secure Custody and Ownership",
                description: "Work with trusted custodians to securely store assets with the tokenized product records for onchain ownership and availability."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/2fd25a51290cae0d89fa5fb1512975cea3193c599cda080d65b09f4f0897454d.png",
                title: "Transparent and Immutable Records",
                description: "Tokenization ensures all relevant product information, transaction history and ownership are stored immutably for accurate attribution."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/12babd8cd671cd4587bd8cab7e78f31e725415fcc84544ded45b07f9fe3d74d2.png",
                title: "Simple and Secure Transfers",
                description: "Send and trade tokenized physical and digital items across platforms with onchain transparency to ensure trust between parties."
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Digital Representation of Inventory", description: "Tokenization allows you to create records representing inventory to enhancing traceability and secure ownership onchain." },
                    { title: "Enhanced Transparency", description: "All details involved with the inventory from transaction history to product metadata are stored onchain to display to 3rd parties." },
                    { title: "Global Market Access", description: "Tokenized assets can be traded globally to further unlock new market opportunities by adding liquidity for existing inventory." },
                    { title: "Secure Custodianship", description: "Inventory can be securely stored by trusted third parties while ownership records can be traded until the rightful owner claims possession of the item." },
                    { title: "Increased Efficiency in Ownership Transfer", description: "Instantly transfer ownership to reduce the time and cost associated with traditional methods of transferring inventory." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default TokenizingProductsPage