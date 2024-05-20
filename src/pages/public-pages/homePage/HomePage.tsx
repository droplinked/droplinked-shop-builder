import { Flex, Image } from '@chakra-ui/react';
import FooterLayout from 'components/layouts/app/main/parts/footer/FooterLayout';
import HeaderMain from 'components/layouts/app/main/parts/header/HeaderMain';
import useHookStore from 'functions/hooks/store/useHookStore';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
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

export enum MODAL_TYPE { SIGNIN = "SIGNIN", SIGNUP = "SIGNUP", RESET = "RESET", GOOGLE = "GOOGLE" };

function HomePage() {
  const { app: { user, shop } } = useHookStore()

  const effects = useMemo(() => (
    <>
      <Image src='/assets/images/homepage/ef1.png' position="absolute" top="0" right={0} zIndex="0" />
      <Image src='/assets/images/homepage/ef2.png' position="absolute" top="50vh" left="0" zIndex="0" />
    </>
  ), [])

  return user && shop ? <Navigate to="/dashboard" /> : (
    <>
      <HeaderMain />
      <ParallaxProvider>
        <Flex direction={"column"} gap={{ base: 150, md: 200 }} paddingBlock={120}>

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
      <FooterLayout />
    </>
  )
}

export default HomePage