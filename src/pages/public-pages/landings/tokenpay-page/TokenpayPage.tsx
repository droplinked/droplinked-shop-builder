import { Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import Details from '../_components/details/Details'
import Layout from '../_components/layout/Layout'
import StarryBorder from '../_components/starry-border/StarryBorder'
import PricingPlans from './_components/pricing-plans/PricingPlans'
import TokenpayFeatures from './_components/TokenpayFeatures'
import localEn from 'locales/public-pages/landings/tokenpay-page/en.json'
import localAr from 'locales/public-pages/landings/tokenpay-page/ar.json'

function TokanpayPage() {
    const navigate = useNavigate()
    const { t } = useLocaleResources('public-pages/landings/tokenpay', { en: localEn , ar: localAr})

    return (
        <Layout>
            <AboveTheFoldSection
                image="https://upload-file-droplinked.s3.amazonaws.com/51c344e1159facd26589efba426ffd829074e6bfe84cea08f4042e2625dccdcb_or.png"
                title={t('aboveTheFold.title')}
                description={t('aboveTheFold.description')}
            />

            <Details
                title={t('cryptoCommerce.title')}
                description={t('cryptoCommerce.description')}
            />

            <TokenpayFeatures />

            <Image src="https://upload-file-droplinked.s3.amazonaws.com/0986e21b7c30093ae869581f68231307778821f8ddddd2ec68533757e9e63425_or.png" />

            <Details
                title={t('empowerCommunities.title')}
                description={t('empowerCommunities.description')}
            />

            <PricingPlans />

            <StarryBorder
                title={t('starryBorder.title')}
                description={t('starryBorder.description')}
                buttonText={t('starryBorder.buttonText')}
                onButtonClick={() => navigate('/onboarding?entry=signup')}
            />
        </Layout>
    )
}

export default TokanpayPage