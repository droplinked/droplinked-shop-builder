import { useMediaQuery } from '@chakra-ui/react'
import { LottieOptions, useLottie } from 'lottie-react'

interface HeroAnimationProps {
    heroDesktop?: Object
    heroTablet?: Object
    heroMobile?: Object
    customStyles?: {
        marginTop?: string
        marginInline?: string | { mobile?: string, tablet?: string, desktop?: string }
    }
}

export default function HeroAnimation({
    heroDesktop,
    heroTablet,
    heroMobile,
    customStyles
}: HeroAnimationProps) {
    const [isTablet] = useMediaQuery("(min-width: 768px) and (max-width: 1280px)")
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    // Default animation data (you can import your default animations here)
    const defaultAnimationData = null // Replace with your default animation

    const getMarginInline = () => {
        if (customStyles?.marginInline) {
            if (typeof customStyles.marginInline === 'string') {
                return customStyles.marginInline
            } else {
                return isMobile ? customStyles.marginInline.mobile || "20px"
                    : isTablet ? customStyles.marginInline.tablet || "36px"
                        : customStyles.marginInline.desktop || "48px"
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
            marginTop: customStyles?.marginTop || "48px",
            marginInline: getMarginInline(),
        }
    }

    const { View } = useLottie(options)

    return animationData ? View : null
}