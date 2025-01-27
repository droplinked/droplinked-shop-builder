import { Link, LinkProps } from '@chakra-ui/react'
import React from 'react'

function ExternalLink({ children, ...props }: LinkProps) {
    return (
        <Link
            textDecoration="underline"
            color="#179EF8"
            cursor="pointer"
            isExternal
            {...props}
        >
            {children}
        </Link>
    )
}

export default ExternalLink