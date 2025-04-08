import { Flex, useBreakpointValue } from '@chakra-ui/react'
import confetti from 'canvas-confetti'
import CommunityEngagement from 'components/redesign/community-engagement/CommunityEngagement'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionControls from './ActionControls'
import VideoPlayer from './VideoPlayer'

function CompletionSlider({ onBack }: Pick<OnboardingStepProps, "onBack">) {
    const navigate = useNavigate()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    const handleSlideChange = (index: number) => {
        setCurrentSlideIndex(index)
        setIsVideoPlaying(index === 0)
    }

    const handlePreviousAction = () => {
        if (currentSlideIndex === 0) return onBack()
        handleSlideChange(0)
    }

    const handleNextAction = () => {
        if (currentSlideIndex === 1) {
            confetti({ zIndex: 99999, particleCount: 320, spread: 240, origin: { x: 0, y: 0 }, angle: 45, colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'], gravity: 0.8 })
            confetti({ zIndex: 99999, particleCount: 320, spread: 240, origin: { x: 1, y: 0 }, angle: 135, colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'], gravity: 0.8 })
            return navigate('/analytics/dashboard')
        }

        handleSlideChange(1)
    }

    return (
        <Flex
            flex={1}
            width="100%"
            maxWidth="912px"
            direction="column"
            justifyContent="space-between"
            gap={6}
        >
            {
                currentSlideIndex === 0
                    ? <VideoPlayer isPlaying={isVideoPlaying} />
                    : <CommunityEngagement columns={communityEngagementColumns} includeBlueSky borderRadius={8} />
            }

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