// Hero section component for partner landing pages with video background
import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroSection from '../../_shared/components/hero-section/HeroSection'
import { usePartnerLanding } from '../context/PartnerLandingContext'
import SubtitleElements from './SubtitleElements'

export default function PartnerHero() {
    const { hero } = usePartnerLanding();
    const responsiveWidth = useBreakpointValue({ base: '250%', md: '100%' })
    const responsiveRight = useBreakpointValue({ base: '75%', md: '0%' })

    const videoStyle = {
        width: responsiveWidth,
        right: responsiveRight,
        maxWidth: "1440px",
        marginInline: "auto",
        position: "relative" as const
    }

    const videoUrl = 'https://upload-file-droplinked.s3.amazonaws.com/50e0182a151bd9e3247744b6082939265383af48283b11306427b6a52a428ad7_or.webm'

    // Convert \n characters to actual newlines
    const processedTitle = hero.title.replace(/\\n/g, '\n')
    const processedSubtitle = hero.subtitle.replace(/\\n/g, '\n')

    return (
        <HeroSection
            title={processedTitle}
            subtitle={processedSubtitle}
            videoDesktop={videoUrl}
            videoTablet={videoUrl}
            videoMobile={videoUrl}
            videoStyle={videoStyle}
            subTitleElements={<SubtitleElements />}
        />
    )
}
