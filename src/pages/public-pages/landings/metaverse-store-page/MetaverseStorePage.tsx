import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function MetaverseStorePage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/651d6e5690bba4d9b48c041ced2944d7704cfb41bf3fa2507c7d3adb1da068ec.png",
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
                image: "https://upload-file-droplinked.s3.amazonaws.com/628242f142e75f070e286b4faa9774cae89a7c54bca21946da6ed13a0c8e660e.png",
                title: "Virtual Showrooms",
                description: "Create fully immersive shopping environments where customers can explore, browse and engage."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/b3f7e15a12c2d81be3fe9e39ed0265d083845906e03982a7b1bccfc79f96d92e.png",
                title: "Boost Engagement",
                description: "Enhance the customer experience with interactive 3D showrooms that offer a more dynamic way to interact with items."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/95e997eba6c1ce99515e3576697b3b6e8ebb13166fc425d07004ccf96e3371bd.png",
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