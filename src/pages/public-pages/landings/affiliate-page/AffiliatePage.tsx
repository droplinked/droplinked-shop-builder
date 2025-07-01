import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/affiliate/en.json'
import localAr from 'locales/public-pages/landings/affiliate/ar.json'


function AffiliatePage() {
    const { t } = useLocaleResources('public-pages/landings/affiliate', { en: localEn , ar: localAr})

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/d2b7a187744a39f4b679c8b5991c2386bbee4670b5ad95a6f9f2098be290c36e.png",
            title: t('aboveTheFold.title'),
            description: t('aboveTheFold.description')
        },
        detailsSection: {
            title: t('details.title'),
            description: t('details.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('details.items.automatedDistributions.title'),
                    description: t('details.items.automatedDistributions.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('details.items.transparentTransactions.title'),
                    description: t('details.items.transparentTransactions.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('details.items.directSettlements.title'),
                    description: t('details.items.directSettlements.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/70d19afed26f8ee609c162ee9f04a908ebde6f91ea8933d452ef5f2dc7793fe6.png",
                title: t('dualSideFlex.merchantBenefits.title'),
                description: [
                    { boldText: t('dualSideFlex.merchantBenefits.description.expandReach.boldText'), rest: t('dualSideFlex.merchantBenefits.description.expandReach.rest') },
                    { boldText: t('dualSideFlex.merchantBenefits.description.trackSales.boldText'), rest: t('dualSideFlex.merchantBenefits.description.trackSales.rest') },
                    { boldText: t('dualSideFlex.merchantBenefits.description.automaticPayouts.boldText'), rest: t('dualSideFlex.merchantBenefits.description.automaticPayouts.rest') }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/32a1b8030634cb50dea0865d693c9cea176e03394657192f091510f71e5478bf.png",
                title: t('dualSideFlex.coSellingBenefits.title'),
                description: [
                    { boldText: t('dualSideFlex.coSellingBenefits.description.discoverPromote.boldText'), rest: t('dualSideFlex.coSellingBenefits.description.discoverPromote.rest') },
                    { boldText: t('dualSideFlex.coSellingBenefits.description.createStorefronts.boldText'), rest: t('dualSideFlex.coSellingBenefits.description.createStorefronts.rest') },
                    { boldText: t('dualSideFlex.coSellingBenefits.description.earnCommissions.boldText'), rest: t('dualSideFlex.coSellingBenefits.description.earnCommissions.rest') }
                ]
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/967845604ed02d8c12b5cb16ad8d5138fdf8a26345658848dcfed024341cf7e3.png",
                title: t('dualSideFlex.easySetup.title'),
                description: t('dualSideFlex.easySetup.description')
            }
        ],
        featureGroups: [
            {
                title: t('features.merchant.title'),
                features: [
                    { title: t('features.merchant.items.createStorefronts.title'), description: t('features.merchant.items.createStorefronts.description') },
                    { title: t('features.merchant.items.manageRequests.title'), description: t('features.merchant.items.manageRequests.description') },
                    { title: t('features.merchant.items.collaborateGrow.title'), description: t('features.merchant.items.collaborateGrow.description') }
                ]
            },
            {
                title: t('features.coSelling.title'),
                features: [
                    { title: t('features.coSelling.items.gettingStarted.title'), description: t('features.coSelling.items.gettingStarted.description') },
                    { title: t('features.coSelling.items.promoteEarn.title'), description: t('features.coSelling.items.promoteEarn.description') },
                    { title: t('features.coSelling.items.collaborateSell.title'), description: t('features.coSelling.items.collaborateSell.description') }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default AffiliatePage