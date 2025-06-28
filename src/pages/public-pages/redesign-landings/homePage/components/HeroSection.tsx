import React from 'react'
import HeroSection from '../../_shared/components/hero-section/HeroSection'
import { AUTH_ROUTES } from 'constants/authRoutes'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Link } from 'react-router-dom'
import VideoDesktop from '../videos/hero-desktop.webm'
import VideoTablet from '../videos/hero-tablet.webm'
import VideoMobile from '../videos/hero-mobile.webm'

export default function HomePageHero() {
    const poster = useBreakpointValue({
        base: '../videos/hero-mobile-poster.jpg',
        md: '../videos/hero-tablet-poster.jpg',
        lg: '../videos/hero-desktop-poster.jpg',
    })

    return (
        <HeroSection
            title={`Commerce That \n Earns The Most`}
            subtitle="From the largest enterprises to solo merchants, droplinked provides tools enabling businesses and entrepreneurs to finance growth and earn more on every sale"
            videoDesktop={VideoDesktop}
            videoTablet={VideoTablet}
            videoMobile={VideoMobile}
            videoStyle={{
                marginTop: "48px"
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
