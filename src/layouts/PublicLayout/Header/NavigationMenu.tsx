import { Link as ChakraLink, Flex, useBreakpointValue } from '@chakra-ui/react'
import getPublicHeaderLinks from 'data/publicHeaderLinks'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu/MegaMenu'

export default function NavigationMenu() {
    const isMobileView = useBreakpointValue({ base: true, xl: false })
    const { t } = useLocaleResources('layout/PublicLayout')
    const publicHeaderLinks = getPublicHeaderLinks(t)

    if (isMobileView) return null

    return (
        <Flex as="nav" align="center" gap={6}>
            <MegaMenu />
            {publicHeaderLinks.map(link => (
                <ChakraLink
                    as={Link}
                    key={link.href}
                    to={link.href}
                    fontSize={14}
                    color="text.subtext.placeholder.dark"
                    _hover={{ color: 'text.white', textDecoration: 'none' }}
                >
                    {link.label}
                </ChakraLink>
            ))}
        </Flex>
    )
}