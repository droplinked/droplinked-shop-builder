import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import localEn from 'locales/public-pages/landings/product-tiles/en.json'
import localAr from 'locales/public-pages/landings/product-tiles/ar.json'

function ProductTilesHero() {
    const { t } = useLocaleResources('public-pages/landings/product-tiles', {
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
                        <AppButton variant='normal' color="neutral.white">
                            {t('hero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/e2c7b59b531bfbf820bc38bb8648eb385ae9e85742383dcb9a39a6b67294a829_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/cc38b89e991660dd266fd2f3f91d592ecb8aac2e5fc463addba0d0f2aaf9cc91_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/e92c7282996eac8e74575d4c8b8bf5fe3f429a65730ad7d2942c756f03259c92_or.webm"
        />
    )
}

export default ProductTilesHero