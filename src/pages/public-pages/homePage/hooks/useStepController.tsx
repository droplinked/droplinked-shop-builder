import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import Lottie from 'lottie-react'
import { useRef, useState, useEffect } from 'react'
import Step1 from '../lottie/GoLive/Step1.json'
import Step2 from '../lottie/GoLive/Step2.json'
import Step3 from '../lottie/GoLive/Step3.json'
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function useStepController() {
    const containerRef = useRef<HTMLDivElement>(null)
    const lottieRef1 = useRef(null)
    const lottieRef2 = useRef(null)
    const lottieRef3 = useRef(null)
    const [step, setStep] = useState(1)
    const [previousStep, setPreviousStep] = useState(1)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const height = useBreakpointValue({ base: "185px", md: "280px", lg: "350px", xl: "auto" })
    const fixedPercentage = step === 1 ? 33 : step === 2 ? 66 : 100

    const LottieStep1 = <Lottie lottieRef={lottieRef1} animationData={Step1} style={{ height }} />
    const LottieStep2 = <Lottie lottieRef={lottieRef2} animationData={Step2} style={{ height }} />
    const LottieStep3 = <Lottie lottieRef={lottieRef3} animationData={Step3} style={{ height }} />

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
                anticipatePin: 1,
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
        LottieView: step === 1 ? LottieStep1 : step === 2 ? LottieStep2 : LottieStep3
    }
}
