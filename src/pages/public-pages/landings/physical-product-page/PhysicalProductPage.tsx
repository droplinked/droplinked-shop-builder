import React from 'react'
import { useNavigate } from 'react-router-dom'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import Features from '../_components/features/Features'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'
import TabularContent from './TabularContent'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/physical-product-page/en.json'
import localAr from 'locales/public-pages/landings/physical-product-page/ar.json'

function PhysicalProductPage() {
    const navigate = useNavigate()
    const { t } = useLocaleResources('public-pages/landings/physical-product' , { en: localEn, ar: localAr })

    return (
        <Layout>
            <AboveTheFoldSection
                image="https://upload-file-droplinked.s3.amazonaws.com/43da5c3bee55cabbcbb7e470866a0f869b5e10862edb3cc3c1075d73885045dc.png"
                title={t('aboveTheFold.title')}
                description={t('aboveTheFold.description')}
            />

            <FrontModularity />

            <PaymentDetails />

            <TabularContent t={t} />

            <Features />

            <StarryBorder
                title={t('starryBorder.title')}
                description={t('starryBorder.description')}
                buttonText={t('starryBorder.buttonText')}
                onButtonClick={() => navigate('/onboarding?entry=signup')}
            />
        </Layout>
    )
}

export default PhysicalProductPage