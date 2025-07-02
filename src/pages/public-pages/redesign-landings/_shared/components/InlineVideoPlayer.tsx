import React from 'react'

const InlineVideoPlayer: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = (props) => {
    const {
        onEnded,
        ...otherProps
    } = props

    return (
        <video
            width="100%"
            height="auto"
            muted={true}
            playsInline={true}
            autoPlay={true}
            loop={true}
            onEnded={onEnded}
            preload='metadata'
            {...otherProps}
        />
    )
}

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer