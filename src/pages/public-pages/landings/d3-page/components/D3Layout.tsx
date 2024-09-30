import { Flex } from '@chakra-ui/react'
import React from 'react'

function D3Layout({ children }) {
    return (
        <Flex
            direction={"column"}
            gap={"200px"}
            padding={"72px"}
            paddingBottom={120}
            backgroundColor={"#010101"}
        >
            {children}
        </Flex>
    )
}

export default D3Layout