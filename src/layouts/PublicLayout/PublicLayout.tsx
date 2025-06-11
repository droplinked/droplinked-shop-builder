import React, { PropsWithChildren, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function PublicLayout({ children }: PropsWithChildren) {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [pathname])

    return (
        <>
            <Header />
            {children ?? <Outlet />}
            <Footer />
        </>
    )
}

export default PublicLayout