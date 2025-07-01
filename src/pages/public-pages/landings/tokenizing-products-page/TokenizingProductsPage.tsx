import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/tokenizing-products/en.json'
import localAr from 'locales/public-pages/landings/tokenizing-products/ar.json'

function TokenizingProductsPage() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products', { en: localEn , ar: localAr})

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/233dfacd6a24711f0a8e4eec91f53915a3949bbf8c8553e542fca1fc0f3ed1de_or.png",
            title: t('aboveTheFoldSection.title'),
            description: t('aboveTheFoldSection.description')
        },
        detailsSection: { 
            title: t('detailsSection.title'),
            description: t('detailsSection.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('detailsSection.detailItems.blockchainBackedOwnership.title'),
                    description: t('detailsSection.detailItems.blockchainBackedOwnership.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('detailsSection.detailItems.simplifyingTokenization.title'),
                    description: t('detailsSection.detailItems.simplifyingTokenization.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('detailsSection.detailItems.globalTradingLiquidity.title'),
                    description: t('detailsSection.detailItems.globalTradingLiquidity.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/d808c51c0933ea64ec9a51ba603e2ab0efaf00df77f08d2522e2d871ec1f4d93_or.png",
                title: t('dualSideFlexData.secureCustodyOwnership.title'),
                description: t('dualSideFlexData.secureCustodyOwnership.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/1302f6a21b39fa84afa03b500226208133a0066d296a433003323368439b331f_or.png",
                title: t('dualSideFlexData.transparentImmutableRecords.title'),
                description: t('dualSideFlexData.transparentImmutableRecords.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/72fffcd155f435c271ec9afb90546534f9b8723dbbf6d8c9e9f4ed5026b7027b_or.png",
                title: t('dualSideFlexData.simpleSecureTransfers.title'),
                description: t('dualSideFlexData.simpleSecureTransfers.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { title: t('featureGroups.features.digitalRepresentationInventory.title'), description: t('featureGroups.features.digitalRepresentationInventory.description') },
                    { title: t('featureGroups.features.enhancedTransparency.title'), description: t('featureGroups.features.enhancedTransparency.description') },
                    { title: t('featureGroups.features.globalMarketAccess.title'), description: t('featureGroups.features.globalMarketAccess.description') },
                    { title: t('featureGroups.features.secureCustodianship.title'), description: t('featureGroups.features.secureCustodianship.description') },
                    { title: t('featureGroups.features.increasedEfficiencyOwnershipTransfer.title'), description: t('featureGroups.features.increasedEfficiencyOwnershipTransfer.description') }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default TokenizingProductsPage