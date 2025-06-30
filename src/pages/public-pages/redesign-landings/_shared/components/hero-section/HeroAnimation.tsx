import { useBreakpointValue } from '@chakra-ui/react'
import InlineVideoPlayer, { InlineVideoPlayerProps } from '../InlineVideoPlayer'
import React from 'react'

interface HeroAnimationProps {
    videoDesktop?: string
    videoTablet?: string
    videoMobile?: string
    style?: React.CSSProperties,
    playerProps?: InlineVideoPlayerProps
}

export default function HeroAnimation({ videoDesktop, videoTablet, videoMobile, style, playerProps }: HeroAnimationProps) {
    const videoUrl = useBreakpointValue({
        base: videoMobile || videoDesktop,
        md: videoTablet || videoDesktop,
        xl: videoDesktop,
    })

    return (
        <InlineVideoPlayer
            src={videoUrl}
            style={style}
            {...playerProps}
        />
    )
}