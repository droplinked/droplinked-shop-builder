import { Heading, HeadingProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends HeadingProps, PropsWithChildren { }

function D3Heading({ children, ...props }: Props) {
    return (
        <Heading as={"h2"} fontSize={32} fontWeight={700} color={"white"} {...props}>{children}</Heading>
    )
}

export default D3Heading