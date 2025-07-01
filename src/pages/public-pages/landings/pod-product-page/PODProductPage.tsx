import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import AboveTheFoldSection from '../_components/above-the-fold/AboveTheFoldSection'
import DualSideFlex from '../_components/dual-side-flex/DualSideFlex'
import Features from '../_components/features/Features'
import FrontModularity from '../_components/front-modularity/FrontModularity'
import Layout from '../_components/layout/Layout'
import PaymentDetails from '../_components/payment-details/PaymentDetails'
import StarryBorder from '../_components/starry-border/StarryBorder'
import localEn from 'locales/public-pages/landings/pod-product-page/en.json';
import localAr from 'locales/public-pages/landings/pod-product-page/ar.json';

const PODProductPage = () => {
    const navigate = useNavigate()
    const { t } = useLocaleResources('public-pages/landings/pod-product-page',{ en: localEn , ar: localAr });

    const getDualSideFlexData = (t: any) => [
        {
            image: 'assets/images/podProduct/customize.png',
            title: t('dualSideFlexData.customize.title'),
            description: t('dualSideFlexData.customize.description'),
        },
        {
            image: 'assets/images/podProduct/easy-customization.png',
            title: t('dualSideFlexData.easyCustomization.title'),
            description: t('dualSideFlexData.easyCustomization.description'),
        },
        {
            image: 'assets/images/podProduct/automated-shipping.png',
            title: t('dualSideFlexData.automatedShipping.title'),
            description: t('dualSideFlexData.automatedShipping.description'),
        },
        {
            image: 'assets/images/podProduct/mint-to-merch.png',
            title: t('dualSideFlexData.mintToMerch.title'),
            description: t('dualSideFlexData.mintToMerch.description'),
        }
    ];

    const dualSideFlexData = getDualSideFlexData(t);

    return (
        <Layout>
            <AboveTheFoldSection
                image="assets/images/podProduct/pod-lion.png"
                title={t('aboveTheFoldSection.title')}
                description={t('aboveTheFoldSection.description')}
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

export default PODProductPage