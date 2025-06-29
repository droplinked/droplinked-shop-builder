import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import HeroSection from '../../../_shared/components/hero-section/HeroSection'
import SubtitleElements from './SubtitleElements'

export default function CrossmintHero() {
    const responsiveWidth = useBreakpointValue({ base: '250%', md: '100%' })
    const responsiveRight = useBreakpointValue({ base: '75%', md: '0%' })

    const videoStyle = {
        width: responsiveWidth,
        right: responsiveRight,
        maxWidth: "1440px",
        marginInline: "auto",
        position: "relative" as const
    }

    const videoUrl = 'https://upload-file-droplinked.s3.amazonaws.com/50e0182a151bd9e3247744b6082939265383af48283b11306427b6a52a428ad7_or.glb'

    return (
        <HeroSection
            title={`Powering \n Agentic Commerce`}
            subtitle={`Crossmint members unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today.`}
            videoDesktop={videoUrl}
            videoTablet={videoUrl}
            videoMobile={videoUrl}
            poster="https://upload-file-droplinked.s3.amazonaws.com/ce9a3bab52d874b2f393a89ef97462c57bbe37b782e52332b5df354b714afc7e.png"
            videoStyle={videoStyle}
            subTitleElements={
                <SubtitleElements />
            }
        />
    )
}
