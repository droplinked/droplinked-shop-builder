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
    const responsiveWidth = useBreakpointValue({ base: '250%', md: '100%' })
    const responsiveRight = useBreakpointValue({ base: '75%', md: '0%' })
    const animationData = useBreakpointValue({
        base: heroMobile || null,
        md: heroTablet || null,
        xl: heroDesktop || null,
    })

    const options: LottieOptions = {
        loop: false,
        autoplay: true,
        animationData,
        style: {
            width: responsiveWidth,
            right: responsiveRight,
            maxWidth: "1440px",
            marginInline: "auto",
            position: "relative"
        },
        ...lottieOptions
    }

    const { View } = useLottie(options)

    return animationData ? View : null
}