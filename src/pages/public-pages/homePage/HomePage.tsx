import { Flex, Image, useDisclosure } from '@chakra-ui/react';
import FooterLayout from 'components/layouts/app/main/parts/footer/FooterLayout';
import HeaderMain from 'components/layouts/app/main/parts/header/HeaderMain';
import useHookStore from 'functions/hooks/store/useHookStore';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
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
import AuthModal from 'components/modals/auth-modal/AuthModal';

export enum MODAL_TYPE { SIGNIN = "SIGNIN", SIGNUP = "SIGNUP", RESET = "RESET", GOOGLE = "GOOGLE" };

function HomePage() {
  const { app: { user, shop } } = useHookStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [States, setStates] = useState({
    pause: false,
    loaded: [],
    typeOfModal: MODAL_TYPE.SIGNIN
  })
  const [searchParams] = useSearchParams()

  const modal_types_convertion = {
      login: MODAL_TYPE.SIGNIN,
      signup: MODAL_TYPE.SIGNUP,
      forgot_password: MODAL_TYPE.RESET,
      google: MODAL_TYPE.GOOGLE
  };

  useEffect(() => {
      const param = searchParams.get("modal");
      if (param) {
          setStates((prev) => ({...prev, typeOfModal: modal_types_convertion[param] || MODAL_TYPE.SIGNIN}))
          onOpen();
      }
  }, [searchParams]);


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
      {isOpen && <AuthModal show={true} type={States.typeOfModal} close={onClose} />}
      <FooterLayout />
    </>
  )
}

export default HomePage