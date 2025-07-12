import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import localEn from 'locales/public-pages/landings/tokenizing-products/en.json'
import localAr from 'locales/public-pages/landings/tokenizing-products/ar.json'

export default function TokenizingProductHero() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products', {
        en: localEn,
        ar: localAr
    })
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })

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
            videoDesktop='https://upload-file-droplinked.s3.amazonaws.com/ae670f10a7125a8b6b48af433d8f91861e8cdcf599a62fa6de57c49dae17b733_or.webm'
            videoTablet='https://upload-file-droplinked.s3.amazonaws.com/a78954bc88bce1f563175671d5cde1c21e28bcf76bc5002eac6e34881c93b8cd_or.webm'
            videoMobile='https://upload-file-droplinked.s3.amazonaws.com/69e47c4b3b9cc49b72a37f8ab2d602e38eb574f200f63eb40321420b797dc582_or.webm'
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
