import { useMediaQuery } from '@chakra-ui/react'
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
    const [isTablet] = useMediaQuery("(min-width: 768px) and (max-width: 1280px)")
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    // Default animation data (you can import your default animations here)
    const defaultAnimationData = null // Replace with your default animation

    const animationData = isMobile ? (heroMobile || defaultAnimationData)
        : isTablet ? (heroTablet || defaultAnimationData)
            : (heroDesktop || defaultAnimationData)

    const options: LottieOptions = {
        loop: false,
        autoplay: true,
        animationData,
        style: {
            marginTop: lottieOptions?.style?.marginTop || "48px",
        },
        ...lottieOptions
    }

    const { View } = useLottie(options)

    return animationData ? View : null
}