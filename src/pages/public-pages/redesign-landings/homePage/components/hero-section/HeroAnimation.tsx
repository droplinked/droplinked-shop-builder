import { useMediaQuery } from '@chakra-ui/react'
import { LottieOptions, useLottie } from 'lottie-react'
import HeroDesktop from '../../lottie/Hero/HeroDesktop.json'
import HeroMobile from '../../lottie/Hero/HeroMobile.json'
import HeroTablet from '../../lottie/Hero/HeroTablet.json'

export default function HeroAnimation() {
    const [isTablet] = useMediaQuery("(min-width: 768px) and (max-width: 1280px)")
    const [isMobile] = useMediaQuery("(max-width: 768px)")
    const options: LottieOptions = {
        loop: false,
        autoplay: true,
        animationData: isMobile ? HeroMobile : isTablet ? HeroTablet : HeroDesktop,
        style: {
            marginTop: "48px",
            marginInline: isMobile ? "20px" : isTablet ? "36px" : "48px",
        }
    }

    const { View } = useLottie(options)

    return View
}
