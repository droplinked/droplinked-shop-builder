import React from 'react'
import SectionContainer from '../common/SectionContainer/SectionContainer'
import MaxWidthWrapper from '../common/MaxWidthWrapper'
import AppButton from 'components/redesign/button/AppButton'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import Stepper from './Stepper'
import { Link } from 'react-router-dom'
import { AUTH_ROUTES } from 'constants/authRoutes'

export default function GoLiveSection() {
    return (
        <MaxWidthWrapper>
            <SectionContainer
                icon='sparkle'
                sectionTitle='GO LIVE IN MINUTES'
                headingTitle={`Effortlessly Designed \n Storefronts and Marketplaces`}
                headingSubtitle={`droplinked makes it simple to sell physical and digital inventory while allowing you \n to earn in cash or crypto`}
                typographyText='How It Works'
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
        </MaxWidthWrapper>
    )
}
