import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function AffiliateSassPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/08d08ec5e26dc51c86569841494cb2fa21833a71f6fd2909c187118a8a4b06ca_or.png",
            title: "Sell online with confidence",
            description: "Empower partners by using onchain technology to ensure delivery and payout distributions are securely attributed. Assign roles and identities to 3rd parties like manufacturers, distributors and co-sellers to seamlessly track commissions and settlements while eliminating fraud and clickjacking.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Secure Affiliate Partnerships",
            description: "Leverage onchain attribution that protects partner relationships. Guarantee accurate commissions while eliminating the fraud typically done to manipulate attribution.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Tamper-Proof Sales",
                    description: "Customers cannot bypass approved co-seller referrals when making purchases in order to protect commission integrity."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Automated Tracking",
                    description: "Easily track affiliate sales and SaaS subscription referrals that ensure accurate, automated commission payouts between parties."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamless Integration",
                    description: "Use the technology without additional coding or technical skills needed to further simplify partnership tracking between distributors and co-sellers."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/a135a53cd10483f31b1fd6d85f1e790b9937861ee0d8b93bec469bb30a1894f3_or.png",
                title: "Protected Commissions",
                description: "Partners and co-sellers earn their fair share with secure affiliate tracking that prevents any loss of commissions for their verified work."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/2ae55b116b86a3faaf05b509f87a1c5f723dc74e7f5cd5d42fc673b9e5addf49_or.png",
                title: "Affiliate Made Easy",
                description: "Integrate inventory and a rewards system with various SaaS platforms and services to expand earning potential across networks."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/18cc2335873d93b925503687f50964632022c6e5136b37525645fd96d7914e78_or.png",
                title: "Real-Time Analytics",
                description: "Monitor subscription referrals and performance metrics in real time to maintain and keep complete control of the affiliate side of the business."
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Secure Affiliate Tracking", description: "Ensure commissions are safely attributed onchain thanks to advanced tracking technology." },
                    { title: "Expand Revenue Streams", description: "Expand reach through multiple networks and partners to grow income on both physical inventory, digital goods and subscription services." },
                    { title: "Automated Commission Payouts and Distributions", description: "Receive automated, accurate payouts that make activating and running affiliate management effortless." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default AffiliateSassPage