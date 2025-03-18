import { Flex, useBreakpointValue } from '@chakra-ui/react'
import CommunityEngagement from 'components/redesign/community-engagement/CommunityEngagement'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import ActionControls from './ActionControls'
import VideoPlayer from './VideoPlayer'
import confetti from 'canvas-confetti'

function CompletionSlider({ onBack }: Pick<OnboardingStepProps, "onBack">) {
    const navigate = useNavigate()
    const sliderRef = useRef<Slider>(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    const handleSlideChange = (index: number) => {
        setCurrentSlideIndex(index)
        setIsVideoPlaying(index === 0)
        sliderRef.current?.slickGoTo(index)
    }

    const handlePreviousAction = () => {
        if (currentSlideIndex === 0) return onBack()
        handleSlideChange(0)
    }

    const handleNextAction = () => {
        if (currentSlideIndex === 1) {
            confetti({
                particleCount: 320,
                spread: 240,
                origin: { x: 0, y: 0 },
                angle: 45,
                colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'],
                gravity: 0.8,
            })

            confetti({
                particleCount: 350,
                spread: 240,
                origin: { x: 1, y: 0 },
                angle: 135,
                colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'],
                gravity: 0.8,
            })

            return navigate('/analytics')
        }
          
        handleSlideChange(1)
    }

    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        fade: true,
        speed: 300
    }

    return (
        <Flex width="100%" maxWidth="912px" direction="column" gap={6}>
            <Slider ref={sliderRef} {...sliderSettings}>
                <VideoPlayer isPlaying={isVideoPlaying} />
                <>
                    <CommunityEngagement columns={communityEngagementColumns} includeBlueSky borderRadius={8} />
                </>
            </Slider>

            <ActionControls
                currentSlideIndex={currentSlideIndex}
                handlePreviousAction={handlePreviousAction}
                handleNextAction={handleNextAction}
                onDotClick={handleSlideChange}
            />
        </Flex>
    )
}

export default CompletionSlider