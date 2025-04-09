import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Footer from "./components/footer/Footer"
import HeaderMain from "./components/header/HeaderMain"
import useAppStore from "lib/stores/app/appStore"

function MainLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const { user } = useAppStore()
  const { pathname } = useLocation()
  const isOnboardingPage = pathname === "/onboarding"

  useEffect(() => {
    switch (user?.status) {
      case "NEW":
        return navigate("/onboarding?entry=email_confirmation")

      case "VERIFIED":
      case "PROFILE_COMPLETED":
        return navigate("/onboarding?entry=store_details")

      default:
        break
    }
  }, [user?.status, navigate])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <Box bgColor="bG">
      {!isOnboardingPage && (
        <>
          <HeaderMain />
          {children || <Outlet />}
          <Footer />
        </>
      )}
      {isOnboardingPage && (children || <Outlet />)}
    </Box>
  )
}

export default MainLayout