import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/homePage/en.json'
import localAr from 'locales/public-pages/landings/homePage/ar.json'
import HeroSection from '../../_shared/components/hero-section/HeroSection'

export default function HomePageHero() {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    return (
        <HeroSection
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t("hero.startNow")}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' bg="label.primary" color="neutral.white">
                            {t("hero.requestDemo")}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/3cfc169e3013aa3e63e042053b3ba8ac6028f52ed8172d89c5894e98b37394e0_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/348c948b0c1df59a484cdbdb7e57fa3980ae6ce77cb76f4b17b719a6139b034e_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/804ef1eb7bf1626f0de140301d8ba21623f3b312e585ac13347d4736feb41c4c_or.webm"
            playerProps={{
                loop: false,
            }}
        />
    )
}
