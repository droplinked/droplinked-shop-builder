import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import localEn from 'locales/public-pages/landings/physical-inventory/en.json'
import localAr from 'locales/public-pages/landings/physical-inventory/ar.json'

function PhysicalInventoryHero() {
    const { t } = useLocaleResources('public-pages/landings/physical-inventory', {
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
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/7a8299bded1685cb0cc8b570c7e221b97c0d95a2909955d75846fb695c0e73f2_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/a40b80c6189a488bef1e457aaa552a17768057da20375d48e8a89680150206fa_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/6433829f0fa0a91e577a06eb537f23c13d96ef9c48c78b823ac4536715f517c2_or.webm"
        />
    )
}

export default PhysicalInventoryHero