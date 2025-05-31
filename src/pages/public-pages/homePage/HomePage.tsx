import { Flex, Image } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/home-page/ar.json';
import enLocale from 'locales/home-page/en.json';
import { useLogin } from 'pages/onboarding/hooks/useLogin';
import React, { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import useAppStore from 'stores/app/appStore';
import Banner from './parts/banner/Banner';
import Community from './parts/community/Community';
import Contact from './parts/contact/Contact';
import Effects from './parts/effects/Effects';
import Embeddable from './parts/embeddable/Embeddable';
import HomePageSection from './parts/homa-page-section/HomePageSection';
import Networks from './parts/networks/Networks';
import Partners from './parts/partners/Partners';
import ProductsMain from './parts/product/ProductsMain';
import Supported from './parts/supported/Supported';

function HomePage() {
  const [searchParams] = useSearchParams()
  const { authenticateUser, finalizeLogin, loading } = useLogin()
  const { user, shop } = useAppStore()
  useLocaleResources("homePage", { en: enLocale, ar: arLocale })

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

  const effects = (
    <>
      <Image src='/assets/images/homepage/ef1.png' position="absolute" top="0" right={0} zIndex="0" />
      <Image src='/assets/images/homepage/ef2.png' position="absolute" top="50vh" left="0" zIndex="0" />
    </>
  )

  return (
    user && shop
      ? <Navigate to="/analytics/dashboard" />
      : (
        <ParallaxProvider>
          <Flex direction={"column"}>
            <HomePageSection>
              <Effects />
              <Banner />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <Partners />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <Community />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <ProductsMain />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <Networks />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <Embeddable />
            </HomePageSection>

            <HomePageSection>
              <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
              <Supported />
            </HomePageSection>

            <HomePageSection>
              <Contact />
            </HomePageSection>
          </Flex>
        </ParallaxProvider>
      )
  )
}

export default HomePage