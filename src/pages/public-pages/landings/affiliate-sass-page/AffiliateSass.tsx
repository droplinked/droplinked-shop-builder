import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'

function AffiliateSass() {
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/fe6dffd33b07044bf7086f981ff458825c93b6c1a4aba2fbd135520873253062.png",
            title: "Affiliate SaaS Subscriptions with Confidence",
            description: "Empower co-sellers to affiliate SaaS subscriptions seamlessly, ensuring secure and trackable commissions without bypass risks.",
            CTAButtonText: "Get Started"
        },
        detailsSection: {
            title: "Secure SaaS Affiliate Partnerships",
            description: "Affiliate SaaS subscriptions with complete protection—no customer bypass, guaranteed commissions.",
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: "Bypass-Proof Subscriptions",
                    description: "Protect your commissions—customers cannot bypass co-sellers when purchasing SaaS subscriptions."
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: "Automated Tracking",
                    description: "Easily track SaaS subscription referrals and ensure accurate, automated commission payouts."
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: "Seamless Integration",
                    description: "Affiliate SaaS platforms without additional coding, simplifying the process for co-sellers."
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/86ecdf7f548f77d8caefd921673d1ed3e9bf136e3498e18d254ef781c95ec714.png",
                title: "Protected Commissions",
                description: "Co-sellers earn their fair share with secure affiliate tracking, preventing any loss of commissions"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/fbc1a0f80517be7923be0bd98c48f32cab2014ae16d51fcf64765e126473fbb6.png",
                title: "Effortless SaaS Affiliation",
                description: "Easily affiliate with various SaaS platforms and services, expanding your earning potential"
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/9d778e3ca2496abac09ea73be96c01f11cbe08dfba63b2b481b503196f1c69a6.png",
                title: "Real-Time Analytics",
                description: "Monitor subscription referrals and performance metrics in real-time, keeping you in control of your affiliate business"
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: "Secure Affiliate Tracking", description: "Ensure your SaaS affiliate commissions are safe from customer bypasses, thanks to advanced tracking technology." },
                    { title: "Automated Commission Payouts", description: "Receive automated, accurate payouts for SaaS subscription referrals, making affiliate management effortless." },
                    { title: "Expand Your Revenue Streams", description: "Affiliate with popular SaaS platforms and grow your income by tapping into the subscription economy." }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default AffiliateSass