import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import CalculationSections from './CalculationSections'

export default function DIMSTHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <>
            <HeroSection
                title={`Product Record Calculator`}
                subtitle="Project anticipated ROI when using droplinked's enterprise inventory management and sales tracking"
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
            >
                {!isMobile && <CalculationSections />}
            </HeroSection>
            {isMobile &&
                <HeroChildFrame>
                </HeroChildFrame>
            }
        </>
    )
}
