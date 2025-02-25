import { Link, LinkProps } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

interface Props extends LinkProps {
    hasArrow?: boolean
}

function ExternalLink({ hasArrow = false, children, ...props }: Props) {
    return (
        <Link
            display="flex"
            alignItems="center"
            gap={1}
            textDecoration="underline"
            color="#179EF8"
            cursor="pointer"
            sx={{ svg: { boxSize: 4, path: { stroke: "#179EF8" } } }}
            isExternal
            {...props}
        >
            {children}
            {hasArrow && <AppIcons.ExternalArrow />}
        </Link>
    )
}

export default ExternalLink