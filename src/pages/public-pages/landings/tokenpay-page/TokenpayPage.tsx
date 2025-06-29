import { Flex } from '@chakra-ui/react'
import React from 'react'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import Details from '../_components/details/Details'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import FeatureGroups from '../_components/feature-groups/FeatureGroups'
import { IAboveTheFoldSection, IDetailsItem, IDualSideFlexData, IFeatureGroup } from '../types/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/tokenpay/en.json'

export default function TokenpayPage() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay', { en: localEn })

    const aboveTheFoldSection: IAboveTheFoldSection = {
        title: t('aboveTheFold.title'),
        description: t('aboveTheFold.description'),
        imageSrc: 'assets/images/tokenpay/aboveTheFold.png',
    }

    const detailsSection: IDetailsItem[] = [
        {
            title: t('details.items.payment.title'),
            description: t('details.items.payment.description'),
            imageSrc: 'assets/images/tokenpay/payment.png',
        },
        {
            title: t('details.items.transaction.title'),
            description: t('details.items.transaction.description'),
            imageSrc: 'assets/images/tokenpay/transaction.png',
        },
        {
            title: t('details.items.security.title'),
            description: t('details.items.security.description'),
            imageSrc: 'assets/images/tokenpay/security.png',
        },
    ]

    const dualSideFlexData: IDualSideFlexData[] = [
        {
            title: t('dualSideFlex.items.payment.title'),
            description: t('dualSideFlex.items.payment.description'),
            imageSrc: 'assets/images/tokenpay/payment.png',
        },
        {
            title: t('dualSideFlex.items.transaction.title'),
            description: t('dualSideFlex.items.transaction.description'),
            imageSrc: 'assets/images/tokenpay/transaction.png',
        },
        {
            title: t('dualSideFlex.items.security.title'),
            description: t('dualSideFlex.items.security.description'),
            imageSrc: 'assets/images/tokenpay/security.png',
        },
    ]

    const featureGroups: IFeatureGroup[] = [
        {
            title: t('features.items.payment.title'),
            description: t('features.items.payment.description'),
            imageSrc: 'assets/images/tokenpay/payment.png',
        },
        {
            title: t('features.items.transaction.title'),
            description: t('features.items.transaction.description'),
            imageSrc: 'assets/images/tokenpay/transaction.png',
        },
        {
            title: t('features.items.security.title'),
            description: t('features.items.security.description'),
            imageSrc: 'assets/images/tokenpay/security.png',
        },
    ]

    return (
        <Flex direction="column" gap={20}>
            <AboveTheFoldSection {...aboveTheFoldSection} />
            <Details items={detailsSection} />
            <DualSideFlex items={dualSideFlexData} />
            <FeatureGroups items={featureGroups} />
        </Flex>
    )
} 