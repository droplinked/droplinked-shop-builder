import useAppToast from 'hooks/toast/useToast'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import JoinNow from './components/JoinNow'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import KeyFeatures from './components/key-features/KeyFeatures'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { authenticateUser, finalizeLogin, loading } = useLogin()
  const { showToast } = useAppToast()

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const access_token = searchParams.get("access_token")
      const refresh_token = searchParams.get("refresh_token")

      if (!access_token || !refresh_token || loading) return

      try {
        const result = await authenticateUser({
          type: "get",
          access_token,
          refresh_token,
          params: { access_token }
        })

        finalizeLogin(result)

        const isCompleted = ["SHOP_INFO_COMPLETED", "ACTIVE"].includes(result.user.status)
        const redirectPath = isCompleted ? "/analytics/dashboard" : "/onboarding"
        navigate(redirectPath)

      } catch (error) {
        navigate('/', { replace: true })
        showToast({ type: "error", message: error?.message || "Login failed. Please try again." })
      }
    }

    handleGoogleAuth()
  }, [searchParams, loading, authenticateUser, finalizeLogin, showToast, navigate])

  return (
    <>
      <HomePageHero />
      <MaxWidthWrapper>
        <MarqueeSection />
        <GoLiveSection />
        <ProductOfferingSection />
        <KeyFeatures />
        <JoinTheCommuity />
        <JoinNow />
      </MaxWidthWrapper>
    </>
  )
}