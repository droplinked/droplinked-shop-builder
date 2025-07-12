import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import localEn from 'locales/public-pages/landings/dpp-landing/en.json'
import localAr from 'locales/public-pages/landings/dpp-landing/ar.json'

export default function DppHero() {
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })
    const { t } = useLocaleResources('public-pages/landings/dpp-landing', { en: localEn, ar: localAr })

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
                        <AppButton variant='normal' color="neutral.white">
                            {t('hero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop='https://upload-file-droplinked.s3.amazonaws.com/daf85a8f70896bdcf168b2969d7fd472150ee208cc8c5a23f9d0e12d759abf7e_or.webm'
            videoTablet='https://upload-file-droplinked.s3.amazonaws.com/26778725eba9b1e2bdb99eb3731005d3f01c54fefc8068c22c86210f53ca8fe9_or.webm'
            videoMobile='https://upload-file-droplinked.s3.amazonaws.com/f9380f7618a1080622be8a4631c3d93b1167cd6d36cf05440e000c419da075a8_or.webm'
            videoStyle={{
                margin: "48px auto auto",
                paddingInline
            }}
            playerProps={{
                loop: false,
            }}
        />
    )
}
