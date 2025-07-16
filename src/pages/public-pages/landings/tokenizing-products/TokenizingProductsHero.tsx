import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function TokenizingProductsHero() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products')

    return (
        <HeroSection
            title={t('TokenizingProductsHero.title')}
            subtitle={t('TokenizingProductsHero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('TokenizingProductsHero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' color="neutral.white">
                            {t('TokenizingProductsHero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop='https://upload-file-droplinked.s3.amazonaws.com/ae670f10a7125a8b6b48af433d8f91861e8cdcf599a62fa6de57c49dae17b733_or.webm'
            videoTablet='https://upload-file-droplinked.s3.amazonaws.com/a78954bc88bce1f563175671d5cde1c21e28bcf76bc5002eac6e34881c93b8cd_or.webm'
            videoMobile='https://upload-file-droplinked.s3.amazonaws.com/69e47c4b3b9cc49b72a37f8ab2d602e38eb574f200f63eb40321420b797dc582_or.webm'
        />
    )
}

export default TokenizingProductsHero