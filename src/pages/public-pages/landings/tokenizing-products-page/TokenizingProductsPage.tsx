import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function TokenizingProductsPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/2344fa8e1a4cf393e62bed5a458ed9543c31dff85d02cba30fb0994405a1d43c.png",
            title: "Tokenize Your Physical Assets Seamlessly",
            description: "Leverage blockchain technology to tokenize your physical products, ensuring secure ownership, transparency, and global liquidity.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Turn Physical Goods into Tokens",
            description: "Create digital representations of your physical assets on the blockchain for secure and transparent trading.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Blockchain-Powered Ownership",
                    description: "Transform physical goods into tokenized assets, secured on the blockchain for tamper-proof ownership."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Seamless Tokenization",
                    description: "Easily tokenize luxury collectibles, physical products, and other assets with NFT technology, backed by secure custody."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Global Trading & Liquidity",
                    description: "Unlock new global markets by making your physical assets tradable as tokens, increasing liquidity and reach."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/3f9b272c6436e721fed899d9dec680d05a7bb657e65bb2328e49ff5811359b4b.png",
                title: "Secure Custody and Ownership",
                description: "Work with trusted custodians to securely hold your physical assets while tokenized NFTs represent ownership on the blockchain"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/2fd25a51290cae0d89fa5fb1512975cea3193c599cda080d65b09f4f0897454d.png",
                title: "Transparent and Immutable Records",
                description: "Tokenization ensures all relevant product information, transaction history, and ownership are stored immutably on the blockchain"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/12babd8cd671cd4587bd8cab7e78f31e725415fcc84544ded45b07f9fe3d74d2.png",
                title: "Effortless Transferability",
                description: "Easily trade your tokenized physical assets across platforms, with full transparency and trust guaranteed by blockchain technology"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Digital Representation of Physical Goods", description: "Tokenization allows you to create NFTs that represent physical products, enhancing traceability and securing ownership on the blockchain." },
                    { title: "Enhanced Transparency", description: "All details, from transaction history to product metadata, are stored transparently on the blockchain, accessible to all potential buyers." },
                    { title: "Global Market Access", description: "Tokenized assets can be traded worldwide, unlocking new market opportunities and increasing the liquidity of physical goods." },
                    { title: "Secure Custodianship", description: "Physical assets are securely stored by trusted third parties, while the NFTs representing ownership can be traded until the owner requests the physical item." },
                    { title: "Increased Efficiency in Ownership Transfer", description: "Instantly transfer ownership of physical assets through NFTs, reducing the time and cost associated with traditional methods of transferring physical goods." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default TokenizingProductsPage