import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function ProductsOnDemandHero() {
    return (
        <HeroSection
            title={`Transform IP and Artwork \n into Premium Merchandise`}
            subtitle="droplinked helps you create and sell customizable products on-demand with no inventory minimums, stock burdens or shipment hassles"
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
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/0b75bd0527fc24dccc35c71570684f82b3ab876e1a0b20eed24525f85acab4a4_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/a40b80c6189a488bef1e457aaa552a17768057da20375d48e8a89680150206fa_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/6433829f0fa0a91e577a06eb537f23c13d96ef9c48c78b823ac4536715f517c2_or.webm"
            videoStyle={{
                margin: "48px auto auto",
                paddingInline: "0px"
            }}
        />
    )
}

export default ProductsOnDemandHero