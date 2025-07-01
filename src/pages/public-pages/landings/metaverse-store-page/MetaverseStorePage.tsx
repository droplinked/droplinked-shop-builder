import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import localEn from 'locales/public-pages/landings/metaverse-store-page/en.json'
import localAr from 'locales/public-pages/landings/metaverse-store-page/ar.json'

function MetaverseStorePage() {
    const { t } = useLocaleResources('public-pages/landings/metaverse-store-page', { en: localEn , ar: localAr })

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/592c32c9822f20852dad6260680fd091c79ff7cba1a372d043f5410fe0bc0423_or.png",
            title: t('aboveTheFold.title'),
            description: t('aboveTheFold.description')
        },
        detailsSection: {
            title: t('details.title'),
            description: t('details.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('details.items.immersive3DExperiences.title'),
                    description: t('details.items.immersive3DExperiences.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('details.items.customizableMarketplace.title'),
                    description: t('details.items.customizableMarketplace.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('details.items.seamlesslyInteractive.title'),
                    description: t('details.items.seamlesslyInteractive.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/bb1c5cad5efc86f2ccca3a5952e89911478888a9caeaf90d4138c05691964e7a_or.png",
                title: t('dualSideFlex.virtualShowrooms.title'),
                description: t('dualSideFlex.virtualShowrooms.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/c9308a13011d8a774f2affdf53f83b4c825f5bd2d791535bc8477920917a7468_or.png",
                title: t('dualSideFlex.boostEngagement.title'),
                description: t('dualSideFlex.boostEngagement.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/33bf3bf105b88697cebea4357965b84dead76023706666196785801e82172771_or.png",
                title: t('dualSideFlex.nextGenRetail.title'),
                description: t('dualSideFlex.nextGenRetail.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: t('features.virtualShowroomCreation.title'), description: t('features.virtualShowroomCreation.description') },
                    { title: t('features.immersiveExperiences.title'), description: t('features.immersiveExperiences.description') },
                    { title: t('features.brandPersonalization.title'), description: t('features.brandPersonalization.description') }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default MetaverseStorePage