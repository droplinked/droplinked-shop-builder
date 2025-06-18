import MaxWidthWrapper from 'pages/public-pages/homePage/components/common/MaxWidthWrapper'
import React, { useEffect, useState } from 'react'
import AuthButtons from './AuthButtons'
import BrandIcon from './BrandIcon/BrandIcon'
import NavigationMenu from './NavigationMenu'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <MaxWidthWrapper
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
            bg={isScrolled ? 'neutral.websiteBackground' : 'transparent'}
            transition="background-color 0.3s ease"
        >
            <BrandIcon />
            <NavigationMenu />
            <AuthButtons />
        </MaxWidthWrapper>
    )
}