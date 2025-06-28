import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import HeroSection from '../../../_shared/components/hero-section/HeroSection'
import SubtitleElements from './SubtitleElements'
import videoUrl from '../../videos/Partners.webm'
import thumbnailUrl from '../../thumbnails/Thumbnail.png'

export default function CrossmintHero() {
    const responsiveWidth = useBreakpointValue({ base: '250%', md: '100%' })
    const responsiveRight = useBreakpointValue({ base: '75%', md: '0%' })

    const videoStyle = {
        width: responsiveWidth,
        right: responsiveRight,
        maxWidth: "1440px",
        marginInline: "auto",
        height: "auto",
        position: "relative" as const
    }

    return (
        <HeroSection
            title={`Powering \n Agentic Commerce`}
            subtitle={`Crossmint members unlock 3 months of the Pro Plan absolutely free! \n Redeem the exclusive offer today.`}
            videoDesktop={videoUrl}
            videoTablet={videoUrl}
            videoMobile={videoUrl}
            poster={thumbnailUrl}
            videoStyle={videoStyle}
            subTitleElements={
                <SubtitleElements />
            }
        />
    )
}
