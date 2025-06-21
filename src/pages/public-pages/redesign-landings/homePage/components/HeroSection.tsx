import React from 'react'
import HeroSection from '../../components/hero-section/HeroSection'
import { AUTH_ROUTES } from 'constants/authRoutes'
import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { Link } from 'react-router-dom'
import HeroDesktop from '../lottie/Hero/HeroDesktop.json'
import HeroTablet from '../lottie/Hero/HeroTablet.json'
import HeroMobile from '../lottie/Hero/HeroMobile.json'

export default function HomePageHero() {
    return (
        <HeroSection
            title={`Commerce That \n Earns The Most`}
            subtitle="From the largest enterprises to solo merchants, droplinked provides tools enabling businesses and entrepreneurs to finance growth and earn more on every sale"
            backgroundImage="https://upload-file-droplinked.s3.amazonaws.com/bb43d560151ac7d20966da30d1d9affdd9b462943a49cbf40e4f893e35c94b07.png"
            heroDesktop={HeroDesktop}
            heroTablet={HeroTablet}
            heroMobile={HeroMobile}
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
