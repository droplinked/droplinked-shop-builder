import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import Features from '../_components/features/Features'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'
import localEn from 'locales/public-pages/landings/digital-product-page/en.json'
import localAr from 'locales/public-pages/landings/digital-product-page/ar.json'

const DigitalProductPage = () => {
    const navigate = useNavigate()
    const { t } = useLocaleResources('public-pages/landings/digital-product-page', { en: localEn , ar: localAr })

    const dualSideFlexData = [
        {
            image: 'assets/images/digitalProduct/create-nft.png',
            title: t('dualSideFlex.mintNfts.title'),
            description: t('dualSideFlex.mintNfts.description'),
        },
        {
            image: 'assets/images/digitalProduct/chain-support.png',
            title: t('dualSideFlex.multiChainIntegration.title'),
            description: t('dualSideFlex.multiChainIntegration.description'),
        },
        {
            image: 'assets/images/digitalProduct/royalty.png',
            title: t('dualSideFlex.loyaltyAndRoyalty.title'),
            description: t('dualSideFlex.loyaltyAndRoyalty.description'),
        },
    ]

    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/digitalProduct/nft.png"
                title={t('aboveTheFold.title')}
                description={t('aboveTheFold.description')}
            />

            <FrontModularity />

            <PaymentDetails />

            {dualSideFlexData.map((item, index) => (
                <DualSideFlex
                    key={index}
                    direction={index % 2 === 0 ? 'rtl' : 'ltr'}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                />
            ))}

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

export default DigitalProductPage