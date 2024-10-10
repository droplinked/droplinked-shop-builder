import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function AffiliateSassPage() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/fe6dffd33b07044bf7086f981ff458825c93b6c1a4aba2fbd135520873253062.png",
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
                image: "https://upload-file-droplinked.s3.amazonaws.com/86ecdf7f548f77d8caefd921673d1ed3e9bf136e3498e18d254ef781c95ec714.png",
                title: "Protected Commissions",
                description: "Partners and co-sellers earn their fair share with secure affiliate tracking that prevents any loss of commissions for their verified work."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/fbc1a0f80517be7923be0bd98c48f32cab2014ae16d51fcf64765e126473fbb6.png",
                title: "Affiliate Made Easy",
                description: "Integrate inventory and a rewards system with various SaaS platforms and services to expand earning potential across networks."
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/9d778e3ca2496abac09ea73be96c01f11cbe08dfba63b2b481b503196f1c69a6.png",
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