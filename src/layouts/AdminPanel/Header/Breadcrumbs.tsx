import { Box } from '@chakra-ui/react'
import { navLinks } from 'data/navLinks'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const Breadcrumbs = () => {
    const { pathname } = useLocation()

    // Calculate breadcrumbs based on pathname and navLinks
    const breadcrumbs = navLinks.filter((link) =>
        pathname.startsWith(link.path) || pathname === link.path
    )

    return (
        <Box as="nav">
            {breadcrumbs.map((item) => (
                <a key={item.path} href={item.path}>{item.label}</a>
            ))}
        </Box>
    )
}