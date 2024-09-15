import { Flex } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import React from 'react'

function FullScreenLoader() {
    return (
        <Flex
            position={"fixed"}
            inset={0}
            backgroundColor="rgba(72, 72, 72, 0.4)"
            backdropFilter="blur(20px)"
            justifyContent="center"
            alignItems="center"
        >
            <LoadingComponent />
        </Flex>
    )
}

export default FullScreenLoader