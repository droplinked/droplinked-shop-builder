import { Flex, useBreakpointValue } from '@chakra-ui/react'
import confetti from 'canvas-confetti'
import CommunityEngagement from 'components/redesign/community-engagement/CommunityEngagement'
import useSubscription from 'hooks/subscription/useSubscription'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionControls from './ActionControls'
import VideoPlayer from './VideoPlayer'

function CompletionSlider() {
    const navigate = useNavigate()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 })
    const { updateOnboardingState } = useOnboardingStore()
    const { hasPaidSubscription } = useSubscription()

    const handleSlideChange = (index: number) => setCurrentSlideIndex(index)

    const handlePreviousAction = () => {
        if (currentSlideIndex > 0) return setCurrentSlideIndex(0)

        const previousOnboardingStep = hasPaidSubscription ? 'PAYMENT_DETAILS' : 'PLAN_SELECTION'
        updateOnboardingState('currentStep', previousOnboardingStep)
    }

    const handleNextAction = () => {
        if (currentSlideIndex === 1) {
            confetti({ zIndex: 99999, particleCount: 320, spread: 240, origin: { x: 0, y: 0 }, angle: 45, colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'], gravity: 0.8 })
            confetti({ zIndex: 99999, particleCount: 320, spread: 240, origin: { x: 1, y: 0 }, angle: 135, colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'], gravity: 0.8 })
            return navigate('/analytics/dashboard', { replace: true })
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
                    ? <VideoPlayer />
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