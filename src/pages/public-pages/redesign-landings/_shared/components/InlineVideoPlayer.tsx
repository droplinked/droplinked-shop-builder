import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    playing?: boolean
    fallback?: React.ReactNode
}

const InlineVideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>((props, ref) => {
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

    const videoRef = useRef<HTMLVideoElement>(null)

    // Expose video element through ref
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement, [])

    // Handle playing prop changes
    useEffect(() => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.play().catch(() => {
                    console.log('Video playback failed, possibly due to autoplay restrictions.')
                })
            } else {
                videoRef.current.pause()
            }
        }
    }, [playing])

    // Show fallback if src is not available
    if (!props.src && fallback) {
        return <>{fallback}</>
    }

    return (
        <video
            ref={videoRef}
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
})

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer