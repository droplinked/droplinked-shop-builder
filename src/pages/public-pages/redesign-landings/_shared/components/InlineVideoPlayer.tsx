import React, { forwardRef } from 'react'
import ReactPlayer from 'react-player'
import { ReactPlayerProps } from 'react-player'

// Use a more specific type for ReactPlayer's instance
// ReactPlayer.ReactPlayerInstance is not exposed, so we'll use a more generic type
const InlineVideoPlayer = forwardRef<any, ReactPlayerProps>((props, ref) => {
    return (
        <ReactPlayer
            ref={ref}
            width="100%"
            height="auto"
            muted={true}
            playsInline={true}
            autoPlay={true}
            loop={true}
            {...props}
        />
    )
})

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer
