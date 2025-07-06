import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function ProductTilesHero() {
    return (
        <HeroSection
            title={`Sell Anywhere, Anytime \n with Product Tiles`}
            subtitle="Easily create product tiles to share across any platform or site for direct selling, no complex integrations or coding required"
            subTitleElements={
                <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                    <Link to={AUTH_ROUTES.SIGN_UP}>
                        <AppButton>
                            Start Now
                        </AppButton>
                    </Link>
                    <Link to='mailto:support@droplinked.com'>
                        <AppButton variant='normal' color="neutral.white">
                            Request a Demo
                        </AppButton>
                    </Link>
                </Flex>
            }
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/9d5f26f90db459a8281dab934d2d3f02281f5914e3433b3edc4a2c534c35b239_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/ea59a223c2ac47720ec5e5ffa6ab61930fd3a0b86cc7d3dd5eb9b7fe0fb922aa_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/9aed308658c6f01ba0874524f01000452b9424d99fceefcd7f6fbead162b1174_or.webm"
            videoStyle={{
                margin: "48px auto auto",
                paddingInline: "0px"
            }}
            playerProps={{
                loop: false,
            }}
        />
    )
}

export default ProductTilesHero