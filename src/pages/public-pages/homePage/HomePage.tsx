import React, { useEffect, useMemo, useState } from 'react'
import Banner from './parts/banner/Banner';
import HeaderMain from 'components/layouts/app/main/parts/header/HeaderMain';
import FooterLayout from 'components/layouts/app/main/parts/footer/FooterLayout';
import ReactFullpage from '@fullpage/react-fullpage';
import classes from './style.module.scss'
import { Box, Flex, Image, position, Show } from '@chakra-ui/react';
import Partners from './parts/partners/Partners';
import Community from './parts/community/Community';
import ProductsMain from './parts/product/ProductsMain';
import Networks from './parts/networks/Networks';
import Embeddable from './parts/embeddable/Embeddable';
import Supported from './parts/supported/Supported';
import Contact from './parts/contact/Contact';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

function HomePage() {
  const [States, setStates] = useState({
    pause: false,
    loaded: []
  })

  const effects = useMemo(() => (
    <>
      <Image src='/assets/images/homepage/ef1.png' position="absolute" top="0" right={{ base: "-200px", lg: "0" }} zIndex="0" />
      <Image src='/assets/images/homepage/ef2.png' position="absolute" top="50vh" left="0" zIndex="0" />
    </>
  ), [])

  return (
    <ParallaxProvider>
      <div style={{ color: "#FFF", overflowX: "hidden" }}>
        <Box className={`${classes.sshape} ${classes.shape1} ${States.pause ? classes.animationPaused : ''}`} fontSize={{ base: "400px", lg: "1400px" }} top={{ base: "0", lg: "100px" }} right="0">s</Box>
        <Box className={`${classes.sshape} ${classes.shape2} ${States.pause ? classes.animationPaused : ''}`} fontSize={{ base: "400px", lg: "1400px" }} top="400px" left={{ base: "0", lg: "-210px" }}>s</Box>

        <Parallax speed={-155} translateX={[50, 1, "easeInOut"]} style={{ position: "absolute", top: "100vh", left: "0", right: "30vw" }}>
          <Image src="assets/images/homepage/shape.svg" position="absolute" zIndex="1" right={{ base: "8%", sm: "26%" }} bottom={{ base: "-100px", sm: "0" }} width={{ base: "24px", sm: "34px" }} />
        </Parallax>

        <ReactFullpage
          anchors={['banner', 'partners', 'community', 'products', 'network', 'embeddable', 'supported', 'contact', 'end']}
          afterLoad={(origin, destination) => {
            setStates(prev => ({ ...prev, pause: !destination.isFirst, loaded: !prev.loaded.includes(destination.anchor) ? [...prev.loaded, destination.anchor] : prev.loaded }))
          }}
          verticalCentered
          autoScrolling={false}
          scrollOverflow={false}
          scrollingSpeed={500}
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section" style={{ position: "relative", overflow: "hidden" }}>
                  <HeaderMain />
                  <Banner />
                </div>
                <div className="section" style={{ position: "relative" }}>
                  <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
                  <Partners loaded={States.loaded} />

                </div>
                <div className="section" style={{ position: "relative" }}>
                  <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
                  <Community loaded={States.loaded} />
                </div>
                <div className="section" style={{ position: "relative" }}>
                  <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
                  <ProductsMain loaded={States.loaded} />
                </div>
                <div className={`section ${classes.autoHeight}`}><Networks /></div>
                <div className="section">
                  <Parallax speed={45} easing={"easeInQuad"} style={{ position: "absolute", top: "30vh", left: "0", right: "0" }}>{effects}</Parallax>
                  <Embeddable />
                </div>
                <div className="section">
                  <Supported />
                </div>
                <div className="section" style={{ position: "relative" }}>
                  <Parallax speed={15} easing={"easeInQuad"} style={{ position: "absolute", top: "0", left: "0", right: "0" }}>
                    <Show above='lg'><Image src='/assets/images/homepage/ef3.png' position="absolute" zIndex="0" bottom="-1000px" left="0" /></Show>
                  </Parallax>
                  <Box width={{ base: "200px", md: "300px", xl: "500px" }} height={{ base: "200px", md: "300px", xl: "500px" }} background="linear-gradient(-50deg, #30977E -170%,transparent)" filter="blur(150px)" bottom="0" right="0" position="absolute"></Box>
                  <Contact />
                </div>
                <div auto-height className={`section ${classes.autoHeight}`}>
                  <FooterLayout />
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </ParallaxProvider >
  )
}

export default HomePage