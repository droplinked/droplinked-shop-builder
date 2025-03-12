import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps { }

function GamificationCard({ children, ...props }: Props) {
    return (
        <Flex borderRadius="10px" padding="10px 20px" bgColor="neutral.gray.1000" {...props}>{children}</Flex>
    )
}

export default GamificationCard