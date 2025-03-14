import { Flex } from '@chakra-ui/react'
import { PlayLg } from 'assets/icons/System/Play/PlayLg'
import React from 'react'

function VideoPlayer() {
    return (
        <Flex
            backgroundImage={`url(https://upload-file-droplinked.s3.amazonaws.com/57cbc63f89bfb08c0edbf34dcf3a79ffff0a2530e518972c93fc8364f4ab3c22.png)`}
            height="500px"
            width="100%"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
        >
            <Flex
                backdropFilter="blur(30px)"
                backgroundColor="rgba(0, 0, 0, 0.50)"
                height="60px"
                width="60px"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
            >
                <PlayLg width="40px" height="40px" color='#fff' />
            </Flex>
        </Flex>
    )
}

export default VideoPlayer