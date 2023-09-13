import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AuthModal from 'components/modals/auth-modal/AuthModal';
import useHookStore from 'functions/hooks/store/useHookStore';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

function HeaderMain() {
  const { app: { shop } } = useHookStore();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { shopNavigate } = useCustomNavigate();
  const { logoutUser } = useProfile()
  const [authModal, setAuthModal] = useState(false);
  const toggleAuthModal = () => setAuthModal((p) => !p);

  // Redirect dashboard
  const clickOnViewShop = useCallback(() => {
    shopNavigate("products");
    onClose();
  }, []);

  // Logout
  const logout = useCallback(() => {
    logoutUser()
    onClose();
  }, []);

  return (
    <>
      <Flex justifyContent="space-between" position="absolute" top="0" right="0" left="0" padding="20px 30px" zIndex="1" alignItems="center">
        <Flex color="#FFF" gap="100px">
          <Link to=''><AppTypography color="#FFF" size='14px'>About Us</AppTypography></Link>
          <Link to=''><AppTypography color="#FFF" size='14px'>Help Center</AppTypography></Link>
        </Flex>
        <Box><AppTypography cursor="pointer" onClick={toggleAuthModal} color="#C2C2C2" border="2px solid #292929" padding="6px 23px" size='12px'>Sign In</AppTypography></Box>
      </Flex>
      <AuthModal show={authModal} shopName={shop?.name} close={toggleAuthModal} />
    </>
  )
}

export default HeaderMain