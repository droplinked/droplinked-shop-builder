import { useMediaQuery } from '@chakra-ui/react'
import { LottieOptions, useLottie } from 'lottie-react'

interface HeroAnimationProps {
    heroDesktop?: Object
    heroTablet?: Object
    heroMobile?: Object
    lottieOptions?: LottieOptions
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

    const getMarginInline = () => {
        if (lottieOptions?.style?.marginInline) {
            if (typeof lottieOptions?.style?.marginInline === 'string') {
                return lottieOptions?.style?.marginInline
            } else {
                return isMobile ? "20px"
                    : isTablet ? "36px" : "48px"
            }
        }
        return isMobile ? "20px" : isTablet ? "36px" : "48px"
    }

    const animationData = isMobile ? (heroMobile || defaultAnimationData)
        : isTablet ? (heroTablet || defaultAnimationData)
            : (heroDesktop || defaultAnimationData)

    const options: LottieOptions = {
        loop: false,
        autoplay: true,
        animationData,
        style: {
            marginTop: lottieOptions?.style?.marginTop || "48px",
            marginInline: getMarginInline(),
        },
        ...lottieOptions
    }

    const { View } = useLottie(options)

    return animationData ? View : null
}