import { Link as ChakraLink, Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
    { label: 'Pricing', href: '/plans' },
    { label: 'Affiliate', href: '/affiliate/products' },
    { label: 'Blog', href: '/blogs' },
    { label: 'About', href: '/about' },
]

export default function NavigationMenu() {
    const isMobileView = useBreakpointValue({ base: true, xl: false })

    if (isMobileView) return null

    return (
        <Flex as="nav" align="center" gap={6}>
            {/* <MegaMenu /> */}
            {navLinks.map(link => (
                <ChakraLink
                    as={Link}
                    key={link.href}
                    to={link.href}
                    fontWeight={14}
                    color="text.subtext.placeholder.dark"
                    _hover={{ color: 'text.white', textDecoration: 'none' }}
                >
                    {link.label}
                </ChakraLink>
            ))}
        </Flex>
    )
}