import React, { useRef, useEffect } from 'react'
import { useVideoLoadingStore } from '../stores/videoLoadingStore'

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
        src,
        ...otherProps
    } = props

    const videoRef = useRef<HTMLVideoElement>(null)
    const { setVideoLoading, isAnyVideoLoading } = useVideoLoadingStore()

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement || !src) return

        const videoId = src

        // Set loading state to true when component mounts
        setVideoLoading(videoId, true)

        const handleLoadedData = () => {
            console.log('Video data loaded successfully')
            setVideoLoading(videoId, false)
            if (videoElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                console.log('Video ready to play, starting playback')
                videoElement.play().catch(error => {
                    console.error('Failed to play video:', error)
                })
            }
        }

        const handleError = () => {
            console.error('Video failed to load')
            setVideoLoading(videoId, false)
        }

        videoElement.addEventListener('loadeddata', handleLoadedData)
        videoElement.addEventListener('error', handleError)

        return () => {
            videoElement.removeEventListener('loadeddata', handleLoadedData)
            videoElement.removeEventListener('error', handleError)
            // Clean up loading state when component unmounts
            setVideoLoading(videoId, false)
        }
    }, [src, setVideoLoading])

    return (
        <video
            ref={videoRef}
            width="100%"
            height="auto"
            muted
            playsInline
            autoPlay
            loop
            onEnded={onEnded}
            preload='metadata'
            src={src}
            {...otherProps}
        />
    )
}

// Add display name for better debugging
InlineVideoPlayer.displayName = 'InlineVideoPlayer'

export default InlineVideoPlayer