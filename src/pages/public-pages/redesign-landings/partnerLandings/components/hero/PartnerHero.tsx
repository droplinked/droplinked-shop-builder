// Hero section component for partner landing pages with video background
import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import HeroSection from '../../../_shared/components/hero-section/HeroSection'
import SubtitleElements from './SubtitleElements'

interface Props {
    partnerId: string;
    title: string;
    subtitle: string;
    partnerLogo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function PartnerHero({partnerId, title, subtitle, partnerLogo}: Props) {
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
    const processedTitle = title.replace(/\\n/g, '\n')
    const processedSubtitle = subtitle.replace(/\\n/g, '\n')

    return (
        <HeroSection
            title={processedTitle}
            subtitle={processedSubtitle}
            videoDesktop={videoUrl}
            videoTablet={videoUrl}
            videoMobile={videoUrl}
            videoStyle={videoStyle}
            subTitleElements={
                <SubtitleElements partnerId={partnerId} partnerLogo={partnerLogo} />
            }
        />
    )
}
