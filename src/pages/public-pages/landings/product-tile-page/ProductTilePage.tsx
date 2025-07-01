import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import localEn from 'locales/public-pages/landings/product-tile-page/en.json';
import localAr from 'locales/public-pages/landings/product-tile-page/ar.json';

function ProductTilePage() {
    const { t } = useLocaleResources('public-pages/landings/product-tile-page', { en: localEn , ar: localAr });

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/42f9efc9a24934b427005ef43e1e75c38a92e5e752bda75a930b873d572d8283_or.png",
            title: t('aboveTheFoldSection.title'),
            description: t('aboveTheFoldSection.description')
        },
        detailsSection: {
            title: t('detailsSection.title'),
            description: t('detailsSection.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageCode />,
                    title: t('detailsSection.detailItems.effortlessEmbeddable.title'),
                    description: t('detailsSection.detailItems.effortlessEmbeddable.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('detailsSection.detailItems.seamlessCheckout.title'),
                    description: t('detailsSection.detailItems.seamlessCheckout.description')
                },
                {
                    icon: <AppIcons.LandingPageTemplate />,
                    title: t('detailsSection.detailItems.customizableDesigns.title'),
                    description: t('detailsSection.detailItems.customizableDesigns.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/0f1e603c9754eab3dd8d5a5b5f8a9c8d0a6f2de5c9ee70184691ca3012e24bc8_or.png",
                title: t('dualSideFlexData.instantlySellEverywhere.title'),
                description: t('dualSideFlexData.instantlySellEverywhere.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/f6293c4f44ae1b4af7be12033ac41c54263a56bb23010a533530208a23e457a9_or.png",
                title: t('dualSideFlexData.flexibleFunctionality.title'),
                description: t('dualSideFlexData.flexibleFunctionality.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/450df138917ce5ed98a90438ab38c3a87129d91d341c7cfff3011a19bf2c7303_or.png",
                title: t('dualSideFlexData.smoothIntegration.title'),
                description: t('dualSideFlexData.smoothIntegration.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { 
                        title: t('featureGroups.features.componentCreation.title'), 
                        description: t('featureGroups.features.componentCreation.description') 
                    },
                    { 
                        title: t('featureGroups.features.seamlessPurchaseFlows.title'), 
                        description: t('featureGroups.features.seamlessPurchaseFlows.description') 
                    },
                    { 
                        title: t('featureGroups.features.customizableComponents.title'), 
                        description: t('featureGroups.features.customizableComponents.description') 
                    }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}

export default ProductTilePage