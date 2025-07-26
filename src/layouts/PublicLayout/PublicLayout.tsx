import { Flex } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/layout/PublicLayout/ar.json'
import enLocale from 'locales/layout/PublicLayout/en.json'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function PublicLayout() {
    const { pathname } = useLocation()
    useLocaleResources('layout/PublicLayout', { en: enLocale, ar: arLocale })

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [pathname])

    return (
        <Flex
            minHeight="100vh"
            direction="column"
            bg="neutral.websiteBackground"
        >
            <Header />
            <Outlet />
            <Footer />
        </Flex>
    )
}

export default PublicLayout