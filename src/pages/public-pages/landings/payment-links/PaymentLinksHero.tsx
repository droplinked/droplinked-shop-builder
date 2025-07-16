import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function PaymentLinksHero() {
    const { t } = useLocaleResources('public-pages/landings/payment-links')

    return (
        <HeroSection
            title={t('PaymentLinksHero.title')}
            subtitle={t('PaymentLinksHero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('PaymentLinksHero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' color="neutral.white">
                            {t('PaymentLinksHero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/c9ae16803bfbc6cd3c8d1d10ede8dc99855747140bba8b24fb98ae49910d53e3_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/34ab5257f5265599aa8bb2d97b6504fd6274f2a39276868eaa2b710c18763ac4_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/187e89635e6e38424f2835e8cef046c562221d6a868abd448501c19a3dc3cc96_or.webm"
        />
    )
}

export default PaymentLinksHero