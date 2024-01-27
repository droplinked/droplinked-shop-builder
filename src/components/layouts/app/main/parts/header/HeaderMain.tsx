import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';
import droplinkFull from "assest/image/droplinkFull.svg";
import AppTypography from 'components/common/typography/AppTypography';
import HeaderDashboardLogedin from 'components/layouts/app/dashboard/parts/header/parts/loged/HeaderDashboardLogedin';
import LoginModal from 'components/modals/login-modal/LoginModal';
import useHookStore from 'functions/hooks/store/useHookStore';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function HeaderMain() {
  const { app: { shop } } = useHookStore();
  const loginModal = useDisclosure()
  const location = useLocation()

  return (
    <>
      <Flex justifyContent="space-between" position="absolute" top="0" right="0" left="0" padding={{ base: "10px 15px", sm: "20px 30px" }} zIndex="10" alignItems="center">
        <Flex color="#FFF" gap={{ base: "13px", md: "100px" }} alignItems="center">
          {location.pathname !== "/" ? <Link to="/#banner"><Image src={droplinkFull} width={{ base: "75px", lg: "125px" }} h="auto" /></Link> : null}
          <Link to='about'><AppTypography color="#FFF" fontSize={{ base: '12px', sm: '14px' }}>About Us</AppTypography></Link>
          <a href='https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked' target="_blank"><AppTypography color="#FFF" fontSize={{ base: '12px', sm: '14px' }}>Help Center</AppTypography></a>
        </Flex>
        <Box>
          {shop ? <HeaderDashboardLogedin /> : (
            <AppTypography borderRadius="8px" cursor="pointer" onClick={loginModal.onOpen} color="#C2C2C2" border="2px solid #292929" padding={{ base: "6px 13px", lg: "6px 23px" }} fontSize='12px'>Sign In</AppTypography>
          )}
        </Box>
      </Flex>
      <LoginModal show={loginModal.isOpen} open={loginModal.onOpen} close={loginModal.onClose} />
    </>
  )
}

export default HeaderMain