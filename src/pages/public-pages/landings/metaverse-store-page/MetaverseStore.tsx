import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function MetaverseStore() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/651d6e5690bba4d9b48c041ced2944d7704cfb41bf3fa2507c7d3adb1da068ec.png",
            title: "Step Into Your Metaverse Store",
            description: "Create immersive 3D shopping experiences in the Metaverse, allowing customers to explore and shop in virtual stores.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "3D Shopping in the Metaverse",
            description: "Transform your shop into a 3D marketplace where customers can explore and interact like never before.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Immersive 3D Stores",
                    description: "Bring your shop to life in the Metaverse with fully interactive, 3D virtual spaces that customers can explore."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Customizable Marketplace",
                    description: "Design a unique 3D store tailored to your brand, offering customers an engaging shopping experience in the Metaverse."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamless Shopping Experience",
                    description: "Allow customers to browse, select, and purchase products directly within your virtual store, just like in real life."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/628242f142e75f070e286b4faa9774cae89a7c54bca21946da6ed13a0c8e660e.png",
                title: "Explore Virtual Marketplaces",
                description: "Create a fully immersive shopping environment where customers can walk through and explore your store in the Metaverse"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/b3f7e15a12c2d81be3fe9e39ed0265d083845906e03982a7b1bccfc79f96d92e.png",
                title: "Boost Engagement",
                description: "Enhance customer engagement with interactive 3D stores that offer a more dynamic and captivating shopping experience"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/95e997eba6c1ce99515e3576697b3b6e8ebb13166fc425d07004ccf96e3371bd.png",
                title: "Next-Gen Retail Experience",
                description: "Take your store to the next level by embracing the future of shopping with a Metaverse presence that stands out"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "3D Virtual Store Creation", description: "Design and launch your very own 3D store in the Metaverse, complete with virtual shelves, products, and interactive elements." },
                    { title: "Interactive Shopping Journey", description: "Let customers experience your products in a whole new way, browsing your store as if they were physically there." },
                    { title: "Brand Personalization", description: "Customize your virtual store to reflect your brand's identity, creating a memorable shopping experience in the Metaverse." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default MetaverseStore