import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import HeroChildFrame from '../_shared/components/HeroChildFrame'
import HeroBrowser from './hero-browser/HeroBrowser'
import useROICalculation from './hooks/useROICalculation'
import Plans from './sections/Plans'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import CalculationResult from './sections/CalculationResult'
import { Refresh1Lg } from 'assets/icons/Action/Refresh1/Refresh1Lg'
import CardsOverlay from './sections/components/CardsOverlay'
import Protocols from './sections/Protocols'

export default function DIMSTHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const roiCalculationVariables = useROICalculation();

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
                {!isMobile &&
                    <HeroChildFrame>
                        <HeroBrowser>
                            <Flex gap={6} p={6}>
                                <RuledGrid columns={1} borderRadius={16} width="60%">
                                    <Plans roiCalculationVariables={roiCalculationVariables} />
                                    <Protocols roiCalculationVariables={roiCalculationVariables} />
                                </RuledGrid>
                                <RuledGrid columns={1} borderRadius={16} width="40%" height="min-content">
                                    <CardsOverlay title="Return on Investment" icon={<Refresh1Lg color="#fff" />} />
                                    <CalculationResult roiCalculationVariables={roiCalculationVariables} />
                                </RuledGrid>
                            </Flex>
                        </HeroBrowser>
                    </HeroChildFrame>
                }
            </HeroSection>
            {isMobile &&
                <HeroChildFrame>
                </HeroChildFrame>
            }
        </>
    )
}
