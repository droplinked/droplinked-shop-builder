import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AuthButtons from './AuthButtons'
import BrandIcon from './BrandIcon'
import NavigationMenu from './NavigationMenu'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Box
            as="header"
            position="sticky"
            top={0}
            zIndex="sticky"
            height="72px"
            boxShadow={isScrolled ? 'sm' : 'none'}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={6}
            paddingInline={{ base: 4, md: 9, xl: "60px", "2xl": "72px" }}
            bg={isScrolled ? 'neutral.websiteBackground' : 'transparent'}
            transition="background-color 0.3s ease"
        >
            <BrandIcon />
            <NavigationMenu />
            <AuthButtons />
        </Box>
    )
}