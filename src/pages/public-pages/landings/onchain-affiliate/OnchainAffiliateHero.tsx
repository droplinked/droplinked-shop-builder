import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'

function OnchainAffiliateHero() {
    return (
        <HeroSection
            title={`Transparent Commerce \n That Earns the Most`}
            subtitle="Unlock opportunities as a merchant or co-seller with the latest onchain technology. As a community-driven platform, droplinked empowers anyone with the tools to earn more on every sale while getting paid faster"
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
            videoDesktop="https://upload-file-droplinked.s3.amazonaws.com/493167ce60655e74a9cac9fe3e13a6681a28881b9b88dea3a7e9b5e54eb728ba_or.webm"
            videoTablet="https://upload-file-droplinked.s3.amazonaws.com/b1f78e5d4f91ba066c26ae7393fb3158adafa52bbbc8d3769230477e1602010d_or.webm"
            videoMobile="https://upload-file-droplinked.s3.amazonaws.com/a7319af0ec51a536b3adb2efee39b9bf9825e864dc0ee430a66a8d6014a39efe_or.webm"
            videoStyle={{
                margin: "48px auto auto",
                paddingInline: "0px"
            }}
        />
    )
}

export default OnchainAffiliateHero