import { Flex } from '@chakra-ui/react'
import LoadingSpinner from 'components/common/loading-spinner/LoadingSpinner'
import React from 'react'

/**
 * FullScreenLoading Component - Overlay loading indicator
 * 
 * Displays a loading spinner centered on a full-screen overlay with
 * blur effect, preventing user interaction with the content beneath.
 * 
 * @returns {JSX.Element} A full-screen overlay with centered loading spinner
 */
function FullScreenLoading() {
    return (
        <Flex
            position="fixed"
            inset={0}
            backgroundColor="rgba(72, 72, 72, 0.4)"
            backdropFilter="blur(20px)"
            justifyContent="center"
            alignItems="center"
            zIndex={9999}
        >
            <LoadingSpinner />
            {/* <video src='/assets/video/entire.webm' autoPlay loop muted width="200px" height="200px" /> */}
        </Flex>
    )
}

export default FullScreenLoading