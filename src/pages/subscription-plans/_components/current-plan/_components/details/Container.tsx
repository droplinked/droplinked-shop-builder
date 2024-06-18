import { Flex } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren { }

function Container({ children }: Props) {
    return (
        <Flex
            direction={"column"}
            gap={4}
            borderRadius={12}
            padding={"16px 20px"}
            bgColor={"#1F1F1F"}
        >
            {children}
        </Flex>
    )
}

export default Container