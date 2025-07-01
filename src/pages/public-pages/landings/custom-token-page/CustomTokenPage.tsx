import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import localEn from 'locales/public-pages/landings/custom-token-page/en.json'
import localAr from 'locales/public-pages/landings/custom-token-page/ar.json'

function CustomTokenPage() {
    const { t } = useLocaleResources('public-pages/landings/custom-token-page', { en: localEn , ar: localAr})

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/80b5e5949e046c3d0d7a6216e162907adc89cc800e75ccc07bb1273a05406b4a_or.png",
            title: t('aboveTheFold.title'),
            description: t('aboveTheFold.description')
        },
        detailsSection: {
            title: t('details.title'),
            description: t('details.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('details.items.tokenPoweredTransactions.title'),
                    description: t('details.items.tokenPoweredTransactions.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('details.items.boostingTokenUtility.title'),
                    description: t('details.items.boostingTokenUtility.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('details.items.seamlessIntegration.title'),
                    description: t('details.items.seamlessIntegration.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/88db5c843ca6683916d2c110293bf1539bd7da7f89671d178eb609580656c337_or.png",
                title: t('dualSideFlex.gameDevelopers.title'),
                description: t('dualSideFlex.gameDevelopers.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/e877c70387348094408e558d72032f0201dfa3a569d775dfe2168924230d3107_or.png",
                title: t('dualSideFlex.realUseRealValue.title'),
                description: t('dualSideFlex.realUseRealValue.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/a15a8a870843603461b90656297e51f3e4e0838e63510e915bca3a3654a40a59_or.png",
                title: t('dualSideFlex.frictionlessPayments.title'),
                description: t('dualSideFlex.frictionlessPayments.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: t('features.customTokenPayments.title'), description: t('features.customTokenPayments.description') },
                    { title: t('features.betterTokenCirculation.title'), description: t('features.betterTokenCirculation.description') },
                    { title: t('features.simpleSetupIntegration.title'), description: t('features.simpleSetupIntegration.description') }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default CustomTokenPage