import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

interface Props {
    isPlaying: boolean
}

function VideoPlayer({ isPlaying }: Props) {
    const videoId = 'ULfaCYQ9rFg'
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Construct URL with proper autoplay parameter based on isPlaying
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=0`

    useEffect(function controlVideoPlayback() {
        if (!iframeRef.current) return

        const iframe = iframeRef.current
        const src = iframe.src

        // Update iframe src to control playback
        if (isPlaying && !src.includes('autoplay=1'))
            iframe.src = src.replace('autoplay=0', 'autoplay=1')
        else if (!isPlaying && src.includes('autoplay=1'))
            iframe.src = src.replace('autoplay=1', 'autoplay=0')
    }, [isPlaying])

    return (
        <Box position="relative" width="100%" height="500px">
            <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={videoUrl}
                title="Droplinked Website Onboarding"
                allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
            />
        </Box>
    )
}

export default VideoPlayer