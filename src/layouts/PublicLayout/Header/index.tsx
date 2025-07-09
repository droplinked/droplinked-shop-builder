import React, { useEffect, useState } from 'react'
import AuthButtons from './AuthButtons'
import BrandIcon from './BrandIcon/BrandIcon'
import NavigationMenu from './NavigationMenu'
import MaxWidthWrapper from 'pages/public-pages/landings/_shared/components/MaxWidthWrapper'
import { Box } from '@chakra-ui/react'

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
            width="100%"
            bg={isScrolled ? 'neutral.websiteBackground' : 'transparent'}
            transition="0.3s ease-in-out"
        >
            <MaxWidthWrapper
                height="72px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={6}
            >
                <BrandIcon />
                <NavigationMenu />
                <AuthButtons />
            </MaxWidthWrapper>
        </Box>
    )
}