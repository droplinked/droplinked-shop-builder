import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../../_shared/components/hero-section/HeroSection'

export default function HomePageHero() {
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })

    return (
        <HeroSection
            title={`Commerce That \n Earns The Most`}
            subtitle="From the largest enterprises to solo merchants, droplinked provides tools enabling businesses and entrepreneurs to finance growth and earn more on every sale"
            videoDesktop="/assets/video/home-page/hero-desktop.webm"
            videoTablet="/assets/video/home-page/hero-tablet.webm"
            videoMobile="/assets/video/home-page/hero-mobile.webm"
            videoStyle={{
                margin: "48px auto auto",
                paddingInline
            }}
            playerProps={{
                loop: false,
            }}
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
        />
    )
}
