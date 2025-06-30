import React from 'react'

export interface InlineVideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    width?: string | number;
    height?: string | number;
    muted?: boolean;
    playsInline?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
}

const InlineVideoPlayer: React.FC<InlineVideoPlayerProps> = (props) => {
    const {
        width = "100%",
        height = "auto",
        muted = true,
        playsInline = true,
        autoPlay = true,
        loop = true,
        onEnded,
        ...otherProps
    } = props

    return (
        <video
            width={width}
            height={height}
            muted={muted}
            playsInline={playsInline}
            autoPlay={autoPlay}
            loop={loop}
            onEnded={onEnded}
            preload='auto'
            {...otherProps}
        />
    )
}

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer