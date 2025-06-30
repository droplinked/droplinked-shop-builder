import React from 'react'

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    playing?: boolean
    fallback?: React.ReactNode
}

const InlineVideoPlayer: React.FC<VideoPlayerProps> = (props) => {
    const {
        width = "100%",
        height = "auto",
        muted = true,
        playsInline = true,
        autoPlay = true,
        loop = true,
        playing,
        fallback,
        onEnded,
        ...otherProps
    } = props

    // Show fallback if src is not available
    if (!props.src && fallback) {
        return <>{fallback}</>
    }

    return (
        <video
            width={width}
            height={height}
            muted={muted}
            playsInline={playsInline}
            autoPlay={autoPlay}
            loop={loop}
            onEnded={onEnded}
            {...otherProps}
        >
            {fallback}
        </video>
    )
}

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer