import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import ReactPlayer from 'react-player'
import { ReactPlayerProps } from 'react-player/dist/types'

export default function InlineVideoPlayer(props: ReactPlayerProps) {
    return (
        <ReactPlayer
            width="100%"
            height="100%"
            muted={true}
            playsInline={true}
            autoPlay={true}
            loop={true}
            fallback={<AppSkeleton isLoaded={false} width="100%" height="100%" />}
            {...props}
        />
    )
}
