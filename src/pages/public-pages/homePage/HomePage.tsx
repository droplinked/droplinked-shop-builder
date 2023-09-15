import React, { useState } from 'react'
import Banner from './parts/banner/Banner';
import HeaderMain from 'components/layouts/app/main/parts/header/HeaderMain';
import FooterLayout from 'components/layouts/app/main/parts/footer/FooterLayout';
import ReactFullpage from '@fullpage/react-fullpage';
import classes from './style.module.scss'
import { Box } from '@chakra-ui/react';
import { ReactComponent as RightBack } from 'assest/image/homepage/rightBack.svg';
import { ReactComponent as LeftBack } from 'assest/image/homepage/leftBack.svg';
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

  console.log(States);


  return (
    <div style={{ color: "#FFF" }}>
      <Box position="fixed" top={0} right={0} left={0} bottom={0}>
        <Box className={`${classes.rightBack} ${States.pause ? classes.animationPaused : ''}`}>
          <Box className={`${classes.circle} ${classes.b1}`}></Box>
          <Box className={`${classes.circle} ${classes.b2}`}></Box>
        </Box>
        <Box className={`${classes.leftBack} ${States.pause ? classes.animationPaused : ''}`}></Box>
      </Box>
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
                <HeaderMain />
                <Banner />
              </div>
              <div className="section"><Partners loaded={States.loaded} /></div>
              <div className="section"><Community loaded={States.loaded} /></div>
              <div className="section"><ProductsMain loaded={States.loaded} /></div>
              <div className={`section ${classes.autoHeight}`}><Networks /></div>
              <div className="section"><Embeddable /></div>
              <div className="section"><Supported /></div>
              <div className="section"><Contact /></div>
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