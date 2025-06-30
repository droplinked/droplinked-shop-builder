import { useLogin } from 'pages/onboarding/hooks/useLogin'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import JoinTheCommuity from '../_shared/components/JoinTheCommuity'
import MaxWidthWrapper from '../_shared/components/MaxWidthWrapper'
import MarqueeSection from '../_shared/components/marquee-wrapper/MarqueeSection'
import HomePageHero from './components/HeroSection'
import JoinNow from './components/JoinNow'
import ProductOfferingSection from './components/ProductOfferingSection'
import GoLiveSection from './components/go-live-section/GoLiveSection'
import KeyFeatures from './components/key-features/KeyFeatures'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const { authenticateUser, finalizeLogin, loading } = useLogin()

  useEffect(() => {
    async function handleGoogleLogin() {
      const access_token = searchParams.get("access_token")
      const refresh_token = searchParams.get("refresh_token")

      if (access_token && refresh_token && !loading) {
        const result = await authenticateUser({
          type: "get",
          access_token,
          refresh_token,
          params: { access_token }
        })
        if (result) await finalizeLogin(result)
      }
    }

    handleGoogleLogin()
  }, [searchParams, loading, authenticateUser, finalizeLogin])

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