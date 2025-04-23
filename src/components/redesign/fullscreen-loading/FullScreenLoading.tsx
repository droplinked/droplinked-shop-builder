import { Flex } from '@chakra-ui/react'
import React from 'react'

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
            <video src='/assets/video/entire.webm' autoPlay loop muted width="200px" height="200px" />
        </Flex>
    )
}

export default FullScreenLoading