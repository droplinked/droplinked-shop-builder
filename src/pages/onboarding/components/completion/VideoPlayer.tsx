import { Flex } from '@chakra-ui/react'
import React, { useRef } from 'react'

function VideoPlayer() {
    const fileId = '19HYPdloC-7TOtopNMZV5a2O_9PLRWWrI'
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Construct Google Drive embed URL
    const videoUrl = `https://drive.google.com/file/d/${fileId}/preview`

    return (
        <Flex flex={1} justifyContent="center" alignItems="center">
            <iframe
                ref={iframeRef}
                width="100%"
                src={videoUrl}
                title="Droplinked Website Onboarding"
                allow="autoplay"
                allowFullScreen
                style={{ borderRadius: '8px', aspectRatio: '16/9' }}
            />
        </Flex>
    )
}

export default VideoPlayer