import { Flex, useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import HeroSection from '../_shared/components/hero-section/HeroSection'
import CalculationSections from './CalculationSections'
import { Link } from 'react-router-dom'
import { AUTH_ROUTES } from 'constants/authRoutes'
import AppButton from 'components/redesign/button/AppButton'

export default function DIMSTHero() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { t } = useLocaleResources('public-pages/landings/DIMST')

    return (
        <>
            <HeroSection
                title={t('DIMSTHero.title')}
                subtitle={t('DIMSTHero.subtitle')}
                subTitleElements={
                    <Flex justifyContent="center" mt={{ base: 4, lg: 6 }} gap={4}>
                        <Link to={AUTH_ROUTES.SIGN_UP}>
                            <AppButton>
                                {t('DIMSTHero.startNow')}
                            </AppButton>
                        </Link>
                        <Link to='mailto:support@droplinked.com'>
                            <AppButton variant='normal' bg="label.primary" color="neutral.white">
                                {t('DIMSTHero.requestDemo')}
                            </AppButton>
                        </Link>
                    </Flex>
                }
            >
                {!isMobile && <CalculationSections />}
            </HeroSection>
            {isMobile && <CalculationSections />}
        </>
    )
}
