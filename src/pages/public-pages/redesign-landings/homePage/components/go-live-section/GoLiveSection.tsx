import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Stepper from './Stepper'
import HowItWorks from '../../svgs/HowItWorks'

export default function GoLiveSection() {
    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='GO LIVE IN MINUTES'
            headingTitle={`Effortlessly Designed \n Storefronts and Marketplaces`}
            headingSubtitle={`droplinked makes it simple to sell physical and digital inventory while allowing you \n to earn in cash or crypto`}
            typographySvg={<HowItWorks />}
            subTitleElement={
                <Link to={AUTH_ROUTES.SIGN_UP}>
                    <AppButton rightIcon={<ArrowrightMd />}>
                        Get Started
                    </AppButton>
                </Link>
            }
        >
            <Stepper />
        </SectionContainer>
    )
}
