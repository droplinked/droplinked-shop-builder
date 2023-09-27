import { Box, Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AuthModal from 'components/modals/auth-modal/AuthModal';
import useHookStore from 'functions/hooks/store/useHookStore';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import droplinkFull from "assest/image/droplinkFull.svg";

function HeaderMain() {
  const { app: { shop } } = useHookStore();
  const [authModal, setAuthModal] = useState(false);
  const toggleAuthModal = () => setAuthModal((p) => !p);
  const location = useLocation()

  return (
    <>
      <Flex justifyContent="space-between" position="absolute" top="0" right="0" left="0" padding={{ base: "10px 15px", sm: "20px 30px" }} zIndex="10" alignItems="center">
        <Flex color="#FFF" gap={{ base: "13px", md: "100px" }} alignItems="center">
          {location.pathname !== "/" ? <Link to="/#banner"><Image src={droplinkFull} width={{ base: "75px", lg: "125px" }} h="auto" /></Link> : null}
          <Link to='about'><AppTypography color="#FFF" size={{ base: '12px', sm: '14px' }}>About Us</AppTypography></Link>
          <a href='https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked' target="_blank"><AppTypography color="#FFF" size={{ base: '12px', sm: '14px' }}>Help Center</AppTypography></a>
        </Flex>
        <Box><AppTypography borderRadius="8px" cursor="pointer" onClick={toggleAuthModal} color="#C2C2C2" border="2px solid #292929" padding={{ base: "6px 13px", lg: "6px 23px" }} size='12px'>Sign In</AppTypography></Box>
      </Flex>
      <AuthModal show={authModal} shopName={shop?.name} close={toggleAuthModal} />
    </>
  )
}

export default HeaderMain