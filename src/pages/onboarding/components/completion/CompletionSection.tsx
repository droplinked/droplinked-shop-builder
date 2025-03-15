import { Flex } from '@chakra-ui/react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import DroplinkedBrand from '../common/DroplinkedBrand'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import ActionControls from './ActionControls'
import CompletionCarousel from './CompletionCarousel'

function CompletionSection({ onBack }: Pick<OnboardingStepProps, "onBack">) {
    const navigate = useNavigate()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const sliderReference = useRef<Slider>(null)

    function handlePreviousAction() {
        if (currentSlideIndex === 0) return onBack()
        updateSlide(0)
    }

    function handleNextAction() {
        if (currentSlideIndex === 1) return navigate('/analytics')
        updateSlide(1)
    }

    function updateSlide(index: number) {
        setCurrentSlideIndex(index)
        sliderReference.current?.slickGoTo(index)
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            gap={{ base: 9, xl: 12 }}
            padding={{ base: 4, md: 6, lg: 9, xl: 12, '3xl': 16 }}
        >
            <DroplinkedBrand />

            <OnboardingStepHeader
                heading="You’re All Set!"
                description="Your account is now live and ready to use."
                textAlign="center"
            />

            <Flex width="100%" maxWidth="912px" direction="column" gap={6} sx={{ ".slick-slide": { padding: 0 }, ".slick-track": { maxW: "100%" } }}>
                <CompletionCarousel ref={sliderReference} currentSlideIndex={currentSlideIndex} />
                <ActionControls
                    currentSlideIndex={currentSlideIndex}
                    handlePreviousAction={handlePreviousAction}
                    handleNextAction={handleNextAction}
                    onDotClick={updateSlide}
                />
            </Flex>
        </Flex>
    )
}

export default CompletionSection