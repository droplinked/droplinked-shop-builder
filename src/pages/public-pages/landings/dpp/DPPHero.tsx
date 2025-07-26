import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function DPPHero() {
    const { t } = useLocaleResources('public-pages/landings/dpp')

    return (
        <HeroSection
            title={t('DPPHero.title')}
            subtitle={t('DPPHero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('DPPHero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' bg="label.primary" color="neutral.white">
                            {t('DPPHero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop='https://upload-file-droplinked.s3.amazonaws.com/daf85a8f70896bdcf168b2969d7fd472150ee208cc8c5a23f9d0e12d759abf7e_or.webm'
            videoTablet='https://upload-file-droplinked.s3.amazonaws.com/26778725eba9b1e2bdb99eb3731005d3f01c54fefc8068c22c86210f53ca8fe9_or.webm'
            videoMobile='https://upload-file-droplinked.s3.amazonaws.com/f9380f7618a1080622be8a4631c3d93b1167cd6d36cf05440e000c419da075a8_or.webm'
        />
    )
}

export default DPPHero