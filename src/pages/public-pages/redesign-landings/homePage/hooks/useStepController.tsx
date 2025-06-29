import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState, useEffect } from 'react'
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'

gsap.registerPlugin(ScrollTrigger)

export function useStepController() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(1)
    const [previousStep, setPreviousStep] = useState(1)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const height = useBreakpointValue({ base: "185px", md: "280px", lg: "350px", xl: "auto" })
    const fixedPercentage = step === 1 ? 33 : step === 2 ? 66 : 100

    const handleVideoEnded = (nextStep: number) => {
        setStep(nextStep);
    };

    const VideoStep1 = (
        <InlineVideoPlayer
            style={{ borderRadius: "24px 24px 0px 0px" }}
            src="/assets/video/home-page/step1.webm"
            height={height}
            onEnded={() => handleVideoEnded(2)}
            playing={step === 1}
        />
    );

    const VideoStep2 = (
        <InlineVideoPlayer
            style={{ borderRadius: "24px 24px 0px 0px" }}
            src="/assets/video/home-page/step2.webm"
            height={height}
            onEnded={() => handleVideoEnded(3)}
            playing={step === 2}
        />
    );

    const VideoStep3 = (
        <InlineVideoPlayer
            style={{ borderRadius: "24px 24px 0px 0px" }}
            src="/assets/video/home-page/step3.webm"
            height={height}
            onEnded={() => handleVideoEnded(1)}
            playing={step === 3}
        />
    );

    // Handle step transitions with animation
    useEffect(() => {
        if (step === previousStep) return

        setIsTransitioning(true)

        // Update completed steps immediately
        const completed = []
        if (step >= 2) completed.push(1)
        if (step >= 3) completed.push(2)
        setCompletedSteps(completed)

        const timer = setTimeout(() => {
            setPreviousStep(step)
            setIsTransitioning(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [step, previousStep])

    useGSAP(() => {
        if (!containerRef.current) return

        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                anticipatePin: 2,
                pin: true,
                pinSpacing: true,
                snap: 0.35,
                onUpdate: (self) => {
                    const progress = self.progress * 100
                    const newStep = progress < 33 ? 1 : progress < 66 ? 2 : 3
                    setStep(newStep)
                }
            },
        })
    }, { scope: containerRef })

    return {
        containerRef,
        step,
        previousStep,
        isTransitioning,
        completedSteps,
        fixedPercentage,
        LottieView: step === 1 ? VideoStep1 : step === 2 ? VideoStep2 : VideoStep3
    }
}
