import { Link, LinkProps } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

/**
 * ExternalLink Component - Styled link for external resources
 * 
 * A link component with consistent styling for external links, featuring
 * underlined blue text and an optional external arrow indicator.
 * 
 * @param {object} props - Component props
 * @param {boolean} [props.hasArrow=false] - Whether to display an arrow icon next to the link text
 * @param {React.ReactNode} props.children - Content to display within the link
 * @param {LinkProps} props - Additional Chakra UI link props
 */
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