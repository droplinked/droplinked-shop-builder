import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function ProductsOnDemandHero() {
    const { t } = useLocaleResources('public-pages/landings/products-on-demand')

    return (
        <HeroSection
            title={t('ProductsOnDemandHero.title')}
            subtitle={t('ProductsOnDemandHero.subtitle')}
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            {t('ProductsOnDemandHero.startNow')}
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' color="neutral.white">
                            {t('ProductsOnDemandHero.requestDemo')}
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/0b75bd0527fc24dccc35c71570684f82b3ab876e1a0b20eed24525f85acab4a4_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/a40b80c6189a488bef1e457aaa552a17768057da20375d48e8a89680150206fa_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/6433829f0fa0a91e577a06eb537f23c13d96ef9c48c78b823ac4536715f517c2_or.webm"
        />
    )
}

export default ProductsOnDemandHero