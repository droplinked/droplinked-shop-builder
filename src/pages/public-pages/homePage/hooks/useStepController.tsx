import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LottieOptions, useLottie } from 'lottie-react'
import { useRef, useState } from 'react'
import Step1 from '../lottie/GoLive/Step1.json'
import Step2 from '../lottie/GoLive/Step2.json'
import Step3 from '../lottie/GoLive/Step3.json'

gsap.registerPlugin(ScrollTrigger)

export function useStepController() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const fixedPercentage = step === 1 ? 33 : step === 2 ? 66 : 100

    const options: LottieOptions = {
        loop: true,
        autoplay: true,
        animationData: step === 1 ? Step1 :
            step === 2 ? Step2 : Step3,
    }

    const { View } = useLottie(options)

    useGSAP(() => {
        if (!containerRef.current) return

        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    const progress = self.progress * 100
                    const newStep = progress < 33 ? 1 : progress < 66 ? 2 : 3
                    setStep(newStep)

                    // Track completed steps for layering effect
                    const completed = []
                    if (newStep >= 2) completed.push(1)
                    if (newStep >= 3) completed.push(2)
                    setCompletedSteps(completed)
                }
            }
        })
    }, { scope: containerRef })

    return {
        containerRef,
        step,
        completedSteps,
        fixedPercentage,
        LottieView: View
    }
}
