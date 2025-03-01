import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "./components/footer/Footer"
import HeaderMain from "./components/header/HeaderMain"

function MainLayout({ children }: PropsWithChildren) {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <Box bgColor="bG">
      {pathname !== "/onboarding" && <HeaderMain />}
      {children || <Outlet />}
      <Footer />
    </Box>
  )
}

export default MainLayout