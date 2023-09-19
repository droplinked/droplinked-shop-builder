import React, { useState } from 'react'
import Banner from './parts/banner/Banner';
import HeaderMain from 'components/layouts/app/main/parts/header/HeaderMain';
import FooterLayout from 'components/layouts/app/main/parts/footer/FooterLayout';
import ReactFullpage from '@fullpage/react-fullpage';
import classes from './style.module.scss'
import { Box, Image } from '@chakra-ui/react';
import Partners from './parts/partners/Partners';
import Community from './parts/community/Community';
import ProductsMain from './parts/product/ProductsMain';
import Networks from './parts/networks/Networks';
import Embeddable from './parts/embeddable/Embeddable';
import Supported from './parts/supported/Supported';
import Contact from './parts/contact/Contact';

function HomePage() {
  const [States, setStates] = useState({
    pause: false,
    loaded: []
  })

  return (
    <div style={{ color: "#FFF" }}>
      <ReactFullpage
        anchors={['banner', 'partners', 'community', 'products', 'network', 'embeddable', 'supported', 'contact', 'end']}
        afterLoad={(origin, destination) => {
          setStates(prev => ({ ...prev, pause: !destination.isFirst, loaded: !prev.loaded.includes(destination.anchor) ? [...prev.loaded, destination.anchor] : prev.loaded }))
        }}
        verticalCentered
        scrollOverflow={false}
        scrollingSpeed={500}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Box position="fixed" top={0} right={0} left={0} bottom={0}>
                  <Box className={`${classes.rightBack} ${States.pause ? classes.animationPaused : ''}`}>
                    <Box className={`${classes.circle} ${classes.b1}`}></Box>
                    <Box className={`${classes.circle} ${classes.b2}`}></Box>
                  </Box>
                  <Box className={`${classes.leftBack} ${States.pause ? classes.animationPaused : ''}`}></Box>
                </Box>
                <HeaderMain />
                <Banner />
              </div>
              <div className="section">
                <Image src='/assets/images/homepage/ef1.png' position="absolute" top="-300px" right="0" zIndex="0" />
                <Image src='/assets/images/homepage/ef2.png' position="absolute" bottom="-300px" left="0" zIndex="0" />
                <Partners loaded={States.loaded} />
              </div>
              <div className="section"><Community loaded={States.loaded} /></div>
              <div className="section">
                <Image src='/assets/images/homepage/ef1.png' position="absolute" top="-200px" right="0" zIndex="0" />
                <Image src='/assets/images/homepage/ef2.png' position="absolute" bottom="-600px" left="0" zIndex="0" />
                <ProductsMain loaded={States.loaded} />
              </div>
              <div className={`section ${classes.autoHeight}`}><Networks /></div>
              <div className="section">
                <Image src='/assets/images/homepage/ef1.png' opacity=".5" zIndex="0" position="absolute" top="-200px" right="0" />
                <Embeddable />
              </div>
              <div className="section">
                <Image src='/assets/images/homepage/ef3.png' position="absolute" zIndex="0" width="50%" bottom="-1000px" left="0" />
                <Supported />
              </div>
              <div className="section">
                <Box width="500px" height="500px" background="linear-gradient(-50deg, #30977E -170%,transparent)" filter="blur(30px)" bottom="0" right="0" position="absolute"></Box>
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
  )
}

export default HomePage