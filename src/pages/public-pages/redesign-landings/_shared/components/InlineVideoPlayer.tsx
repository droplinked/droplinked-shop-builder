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
        onEnded,
        ...otherProps
    } = props

    return (
        <video
            width="100%"
            height="metadata"
            muted={true}
            playsInline={true}
            autoPlay={true}
            loop={true}
            onEnded={onEnded}
            preload='auto'
            {...otherProps}
        />
    )
}

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer