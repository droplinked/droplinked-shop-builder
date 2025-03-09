import { Flex } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import DroplinkedBrand from '../DroplinkedBrand'
import OnboardingStepHeader from '../OnboardingStepHeader'
import ActionControls from './ActionControls'
import CompletionCarousel from './CompletionCarousel'

function CompletionSection() {
    const navigate = useNavigate()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const sliderReference = useRef<Slider>(null)
    const { prevStep } = useOnboardingStore()

    const handlePreviousAction = () => {
        if (currentSlideIndex === 0) return prevStep()

        setCurrentSlideIndex(0)
        sliderReference.current?.slickGoTo(0)
    }

    const handleNextAction = () => {
        if (currentSlideIndex === 1) return navigate('/analytics')

        setCurrentSlideIndex(1)
        sliderReference.current?.slickGoTo(1)
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            gap={{ base: 9, xl: 12 }}
            padding={{ base: 4, md: 6, lg: 9, xl: 12, "3xl": 16 }}
        >
            <DroplinkedBrand />

            <OnboardingStepHeader
                heading="You’re All Set!"
                description="Your account is now live and ready to use."
                textAlign="center"
            />

            <Flex width="100%" maxWidth="912px" direction="column" gap={6}>
                <CompletionCarousel ref={sliderReference} />
                <ActionControls
                    currentSlideIndex={currentSlideIndex}
                    handlePreviousAction={handlePreviousAction}
                    handleNextAction={handleNextAction}
                />
            </Flex>
        </Flex>
    )
}

export default CompletionSection