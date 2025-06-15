import React from 'react'
import SectionContainer from '../common/SectionContainer/SectionContainer'
import MaxWidthWrapper from '../common/MaxWidthWrapper'
import AppButton from 'components/redesign/button/AppButton'
import { Link } from '@chakra-ui/react'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import Stepper from './Stepper'

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
                    <Link href='/onboarding?entry=signup'>
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
