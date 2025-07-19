import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function CustomTokensHero() {
    const { t } = useLocaleResources('public-pages/landings/custom-tokens')

    return (
        <HeroSection
            title={t('CustomTokensHero.title')}
            subtitle={t('CustomTokensHero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('CustomTokensHero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' bg="label.primary" color="neutral.white">
                            {t('CustomTokensHero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/412e5be8abbf469deb0fa3979089d411f23d667e6e5cb1e4a844ef71a42e77a3_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/bd0386cd1b3ff31c98b20f9d203b72e56724de583caefc59befb1f62c5f67350_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/bd0386cd1b3ff31c98b20f9d203b72e56724de583caefc59befb1f62c5f67350_or.webm"
        />
    )
}

export default CustomTokensHero