import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import LandingPageTemplate from '../_components/landing-page-template/LandingPageTemplate'
import { ILandingPageTemplate } from '../types/interfaces'
import localEn from 'locales/public-pages/landings/payment-link-page/en.json';
import localAr from 'locales/public-pages/landings/payment-link-page/ar.json';

export default function PaymentLinkPage() {
    const { t } = useLocaleResources('public-pages/landings/payment-link-page', { en: localEn , ar: localAr });

    const data: ILandingPageTemplate = {
        aboveTheFoldSection: {
            image: "https://upload-file-droplinked.s3.amazonaws.com/6c4f2ff19d7bdcd9f664254195647e74714ee7032cf60ccfaffb4d13484ca8c1_or.png",
            title: t('aboveTheFoldSection.title'),
            description: t('aboveTheFoldSection.description')
        },
        detailsSection: {
            title: t('detailsSection.title'),
            description: t('detailsSection.description'),
            detailItems: [
                {
                    icon: <AppIcons.LandingPageLink />,
                    title: t('detailsSection.detailItems.instantPaymentLinks.title'),
                    description: t('detailsSection.detailItems.instantPaymentLinks.description')
                },
                {
                    icon: <AppIcons.LandingPageDesignNib />,
                    title: t('detailsSection.detailItems.customizablePaymentPages.title'),
                    description: t('detailsSection.detailItems.customizablePaymentPages.description')
                },
                {
                    icon: <AppIcons.LandingPageCreditCard />,
                    title: t('detailsSection.detailItems.cryptoAndFiatPayments.title'),
                    description: t('detailsSection.detailItems.cryptoAndFiatPayments.description')
                }
            ]
        },
        dualSideFlexData: [
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/b76297471777e5f38afe1e7bde7e25e04731557547814ad788e64f52d947dc79_or.png",
                title: t('dualSideFlexData.sellAnywhereAnytime.title'),
                description: t('dualSideFlexData.sellAnywhereAnytime.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/4e30d441479c64c0fe1a24a84079683e0d39fd73ae1321a308f6a3847c40cfb4_or.png",
                title: t('dualSideFlexData.noCodingRequired.title'),
                description: t('dualSideFlexData.noCodingRequired.description')
            },
            {
                image: "https://upload-file-droplinked.s3.amazonaws.com/ec103f93a5cf04ced2952940a47783bda566de1e7b1b587cbac41039ee1d2cd1_or.png",
                title: t('dualSideFlexData.streamlinedCheckout.title'),
                description: t('dualSideFlexData.streamlinedCheckout.description')
            }
        ],
        featureGroups: [
            {
                features: [
                    { 
                        title: t('featureGroups.features.directPaymentLinks.title'), 
                        description: t('featureGroups.features.directPaymentLinks.description') 
                    },
                    { 
                        title: t('featureGroups.features.customizableExperience.title'), 
                        description: t('featureGroups.features.customizableExperience.description') 
                    },
                    { 
                        title: t('featureGroups.features.alternativePaymentMethods.title'), 
                        description: t('featureGroups.features.alternativePaymentMethods.description') 
                    }
                ]
            }
        ]
    }

    return <LandingPageTemplate data={data} />
}