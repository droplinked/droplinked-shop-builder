import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import localEn from 'locales/public-pages/landings/tokenpay/en.json'
import localAr from 'locales/public-pages/landings/tokenpay/ar.json'

function TokenpayHero() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay', {
        en: localEn,
        ar: localAr
    })
    return (
        <HeroSection
            title={t('hero.title')}
            subtitle={t('hero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('hero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' bg="label.primary" color="neutral.white">
                            {t('hero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            imageDesktop="https://upload-file-droplinked.s3.amazonaws.com/fbaf8e74973ed4b141b858f4e2904401e3d15d2bd86e04eb0fe915924b4c0bcc.png"
            imageTablet="https://upload-file-droplinked.s3.amazonaws.com/f1701d3b12a66dceafa44490b8c393cb2a10bb95f8a889c6849ed34f8a931bab.png"
            imageMobile="https://upload-file-droplinked.s3.amazonaws.com/39459f0d64714a5048496d708787e2de55629075d8ed3c3cfc77ca1754d21627.png"
        />
    )
}

export default TokenpayHero