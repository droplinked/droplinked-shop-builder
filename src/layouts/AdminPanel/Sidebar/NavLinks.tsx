import { Box } from '@chakra-ui/react'
import { navLinks } from 'data/navLinks'
import React from 'react'

export const NavLinks = () => {
    return (
        <Box as="nav">
            {navLinks.map((link) => (
                <a key={link.path} href={link.path}>{link.label}</a>
            ))}
        </Box>
    )
}