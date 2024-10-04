import { Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends HeadingProps { }

function D3Heading({ children, ...props }: Props) {
    return (
        <Heading as="h2" fontSize={{ base: 24, md: 32 }} fontWeight={700} color="white" {...props}>{children}</Heading>
    )
}

export default D3Heading