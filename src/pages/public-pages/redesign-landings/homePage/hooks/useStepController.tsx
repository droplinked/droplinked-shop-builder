import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState, useEffect } from 'react'
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'

gsap.registerPlugin(ScrollTrigger)

/**
 * useStepController - A custom hook for managing a multi-step scroll animation
 * 
 * This hook provides functionality for:
 * 1. Tracking the current step of a scrolling animation (1-3)
 * 2. Managing video playback based on the current step
 * 3. Tracking completed steps to show progress
 * 4. Handling smooth transitions between steps
 * 5. Setting up GSAP ScrollTrigger for scroll-based animations
 * 
 * The animations are triggered by scroll position, with each step taking about 33%
 * of the total scroll progress. Videos will only play when their step is active.
 */
export function useStepController() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(1)
    const [previousStep, setPreviousStep] = useState(1)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const height = useBreakpointValue({ base: "185px", md: "280px", lg: "350px", xl: "auto" })
    const fixedPercentage = step === 1 ? 33 : step === 2 ? 66 : 100

    // Handle when a video ends - advance to the next step
    const handleVideoEnded = (nextStep: number) => {
        setStep(nextStep);
    };

    // Common video style with display property based on current step
    const getVideoStyle = (videoStep: number) => ({
        borderRadius: "16px 16px 0px 0px",
        display: step === videoStep ? 'block' : 'none'
    });

    // Render all videos but only show the active one
    // This prevents re-rendering issues while maintaining state
    const allVideos = (
        <>
            <InlineVideoPlayer
                style={getVideoStyle(1)}
                src="/assets/video/home-page/step1.webm"
                height={height}
                onEnded={() => handleVideoEnded(2)}
                playing={step === 1}
                key="video-step-1"
            />
            <InlineVideoPlayer
                style={getVideoStyle(2)}
                src="/assets/video/home-page/step2.webm"
                height={height}
                onEnded={() => handleVideoEnded(3)}
                playing={step === 2}
                key="video-step-2"
            />
            <InlineVideoPlayer
                style={getVideoStyle(3)}
                src="/assets/video/home-page/step3.webm"
                height={height}
                onEnded={() => handleVideoEnded(1)}
                playing={step === 3}
                key="video-step-3"
            />
        </>
    )

    // Handle step transitions with animation
    useEffect(() => {
        // Skip if the step hasn't changed
        if (step === previousStep) return

        setIsTransitioning(true)

        // Update completed steps immediately
        const completed = []
        if (step >= 2) completed.push(1)
        if (step >= 3) completed.push(2)
        setCompletedSteps(completed)

        // Delay the update to previous step to allow for transition animations
        const timer = setTimeout(() => {
            setPreviousStep(step)
            setIsTransitioning(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [step, previousStep])

    // Setup the GSAP ScrollTrigger to control the step based on scroll position
    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                markers: true, // Set to true for debugging
                onUpdate: (self) => {
                    // Calculate which step we're in based on scroll progress
                    const progress = self.progress * 100
                    const newStep = progress < 33 ? 1 : progress < 66 ? 2 : 3
                    setStep(newStep)
                },
                onRefresh: (self) => {
                    // Ensure ScrollTrigger recalculates properly on refresh
                    self.update();
                }
            },
        })
    }, [])

    // Add a manual refresh when the component is fully loaded
    useEffect(() => {
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 100);

        return () => clearTimeout(refreshTimer);
    }, []);

    return {
        containerRef,
        step,
        previousStep,
        isTransitioning,
        completedSteps,
        fixedPercentage,
        LottieView: allVideos
    }
}
