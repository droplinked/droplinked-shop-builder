import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/affiliate-sass-page/en.json'
import localAr from 'locales/public-pages/landings/affiliate-sass-page/ar.json'

function AffiliateSassPage() {
    const { t } = useLocaleResources('public-pages/landings/affiliate-sass', { en: localEn, ar: localAr })
    
    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/08d08ec5e26dc51c86569841494cb2fa21833a71f6fd2909c187118a8a4b06ca_or.png",
            title: t('aboveTheFoldSection.title'),
            description: t('aboveTheFoldSection.description')
        },
        detailsSection: {
            title: t('detailsSection.title'),
            description: t('detailsSection.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('detailsSection.detailItems.tamperProofSales.title'),
                    description: t('detailsSection.detailItems.tamperProofSales.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('detailsSection.detailItems.automatedTracking.title'),
                    description: t('detailsSection.detailItems.automatedTracking.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('detailsSection.detailItems.seamlessIntegration.title'),
                    description: t('detailsSection.detailItems.seamlessIntegration.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/a135a53cd10483f31b1fd6d85f1e790b9937861ee0d8b93bec469bb30a1894f3_or.png",
                title: t('dualSideFlexData.protectedCommissions.title'),
                description: t('dualSideFlexData.protectedCommissions.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/2ae55b116b86a3faaf05b509f87a1c5f723dc74e7f5cd5d42fc673b9e5addf49_or.png",
                title: t('dualSideFlexData.affiliateMadeEasy.title'),
                description: t('dualSideFlexData.affiliateMadeEasy.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/18cc2335873d93b925503687f50964632022c6e5136b37525645fd96d7914e78_or.png",
                title: t('dualSideFlexData.realTimeAnalytics.title'),
                description: t('dualSideFlexData.realTimeAnalytics.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: t('featureGroups.features.secureAffiliateTracking.title'), description: t('featureGroups.features.secureAffiliateTracking.description') },
                    { title: t('featureGroups.features.expandRevenueStreams.title'), description: t('featureGroups.features.expandRevenueStreams.description') },
                    { title: t('featureGroups.features.automatedCommissionPayouts.title'), description: t('featureGroups.features.automatedCommissionPayouts.description') }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default AffiliateSassPage