import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import React from 'react'
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom'

interface IframeAwareLinkProps {
    to: string
    children: React.ReactNode
    // Allow passing through Chakra UI link props
    chakraProps?: Omit<ChakraLinkProps, 'href' | 'as'>
    // Allow passing through React Router link props
    routerProps?: Omit<RouterLinkProps, 'to'>
}

/**
 * IframeAwareLink component that switches between React Router Link and anchor tag
 * based on whether the page is being rendered inside an iframe.
 * 
 * When in iframe: Uses anchor tag with target="_blank" to open in new tab
 * When not in iframe: Uses React Router Link for SPA navigation
 * 
 * This ensures that when the page is embedded in an iframe (e.g., in repo2),
 * header and footer links open in a new tab instead of navigating within the iframe.
 */
const IframeAwareLink: React.FC<IframeAwareLinkProps> = ({ 
    to, 
    children, 
    chakraProps = {}, 
    routerProps = {} 
}) => {
    // Detect if page is being rendered inside an iframe
    // window.self !== window.top indicates the page is in an iframe
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top

    if (isInIframe) {
        // In iframe: use anchor tag to open in new tab
        return (
            <ChakraLink
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                {...chakraProps}
            >
                {children}
            </ChakraLink>
        )
    }

    // Not in iframe: use React Router Link for SPA navigation
    return (
        <ChakraLink
            as={Link}
            to={to}
            {...chakraProps}
            {...routerProps}
        >
            {children}
        </ChakraLink>
    )
}

export default IframeAwareLink 