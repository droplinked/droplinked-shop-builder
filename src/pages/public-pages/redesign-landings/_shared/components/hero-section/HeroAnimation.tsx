import { useBreakpointValue } from '@chakra-ui/react'
import InlineVideoPlayer from '../InlineVideoPlayer'
import React from 'react'
import { ReactPlayerProps } from 'react-player'

interface HeroAnimationProps {
    videoDesktop?: string
    videoTablet?: string
    videoMobile?: string
    poster?: string
    style?: React.CSSProperties,
    playerProps?: ReactPlayerProps
}

export default function HeroAnimation({ videoDesktop, videoTablet, videoMobile, poster, style, playerProps }: HeroAnimationProps) {
    const videoUrl = useBreakpointValue({
        base: videoMobile || videoDesktop,
        md: videoTablet || videoDesktop,
        xl: videoDesktop,
    })

    return (
        <InlineVideoPlayer
            src={videoUrl}
            fallback={
                <img
                    src={poster}
                    alt="Video poster"
                    style={{ marginInline: "auto", ...style }}
                />
            }
            style={style}
            {...playerProps}
        />
    )
}