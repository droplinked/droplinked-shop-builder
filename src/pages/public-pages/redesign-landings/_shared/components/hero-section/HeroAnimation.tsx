import { useBreakpointValue } from '@chakra-ui/react'
import { LottieOptions, useLottie } from 'lottie-react'

interface HeroAnimationProps {
    heroDesktop?: Object
    heroTablet?: Object
    heroMobile?: Object
    lottieOptions?: Omit<LottieOptions, 'animationData'>
}

export default function HeroAnimation({
    heroDesktop,
    heroTablet,
    heroMobile,
    lottieOptions
}: HeroAnimationProps) {
    const animationData = useBreakpointValue({
        base: heroMobile || null,
        md: heroTablet || null,
        xl: heroDesktop || null,
    })

    const options: LottieOptions = {
        loop: false,
        autoplay: true,
        animationData,
        ...lottieOptions
    }

    const { View } = useLottie(options)

    return animationData ? View : null
}