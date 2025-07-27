import { useBreakpointValue } from '@chakra-ui/react'
import InlineVideoPlayer from '../InlineVideoPlayer'
import React from 'react'

/**
 * Props for HeroAnimation component
 */
interface HeroAnimationProps {
    /** Video URL for desktop breakpoint */
    videoDesktop?: string
    /** Video URL for tablet breakpoint */
    videoTablet?: string
    /** Video URL for mobile breakpoint */
    videoMobile?: string
    /** Custom styles for video player */
    style?: React.CSSProperties,
    /** HTML video element props */
    playerProps?: React.VideoHTMLAttributes<HTMLVideoElement>
}

/**
 * Responsive video animation component used within HeroSection.
 * Selects appropriate video source based on current breakpoint and renders using InlineVideoPlayer.
 */
export default function HeroAnimation({ videoDesktop, videoTablet, videoMobile, style, playerProps }: HeroAnimationProps) {
    const videoUrl = useBreakpointValue({
        base: videoMobile || videoDesktop,
        md: videoTablet || videoDesktop,
        xl: videoDesktop,
    })
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })


    return (
        <InlineVideoPlayer
            src={videoUrl}
            style={{ paddingInline, margin: "48px auto auto", marginBottom: 0, ...style }}
            {...playerProps}
        />
    )
}