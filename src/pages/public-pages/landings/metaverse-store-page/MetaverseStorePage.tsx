import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function MetaverseStorePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/592c32c9822f20852dad6260680fd091c79ff7cba1a372d043f5410fe0bc0423_or.png",
            title: "The future of commerce is immersive",
            description: "Enable existing and future customers to explore and shop in virtual stores and environments. Create and manage inventory alongside interactive AR/VR 3D shopping experiences that are metaverse- ready.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Interactive Commerce Anywhere",
            description: "Transform existing shops and inventory into a 3D experience where customers can explore and interact like never before",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Immersive 3D Experiences",
                    description: "Bring inventory into metaverses and beyond with fully interactive, 3D virtual spaces that customers can explore."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Customizable Marketplace",
                    description: "Separately offer customers a unique 3D store tailored to deliver an interactive and engaging shopping experience."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamlessly Interactive",
                    description: "Allow customers to browse, select, and purchase products directly within your virtual store."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/bb1c5cad5efc86f2ccca3a5952e89911478888a9caeaf90d4138c05691964e7a_or.png",
                title: "Virtual Showrooms",
                description: "Create fully immersive shopping environments where customers can explore, browse and engage."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/c9308a13011d8a774f2affdf53f83b4c825f5bd2d791535bc8477920917a7468_or.png",
                title: "Boost Engagement",
                description: "Enhance the customer experience with interactive 3D showrooms that offer a more dynamic way to interact with items."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/33bf3bf105b88697cebea4357965b84dead76023706666196785801e82172771_or.png",
                title: "Next-Gen Retail",
                description: "Embrace the future of commerce by offering an interactive experience that stands out."
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Virtual Showroom Creation", description: "Design and launch an immersive shop complete with virtual shelves, products and interactive elements." },
                    { title: "Immersive Experiences", description: "Let customers interact with products in an entirely new way by browsing a showroom filled with dynamic inventory." },
                    { title: "Brand Personalization", description: "Customize the virtual showroom to reflect your brand's identity while creating an unforgettable experience that embodies your brand." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default MetaverseStorePage