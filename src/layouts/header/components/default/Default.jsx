import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
  HeaderWrapper,
  HeaderTitle,
  BurgerIcon,
  HeaderButton,
} from "../../Header-style";

import AuthModal from "../../../../modals/auth/AuthModal";
import burger from "../../../../assest/icon/test-burger-icon.svg";

const Default = () => {
  const [authModal, setAuthModal] = useState(false);

  const navigate = useNavigate();

  const toggleAuthModal = () => setAuthModal((p) => !p);
  const navigateToLandingPage = () => navigate("/");

  return (
    <>
      <HeaderWrapper>
        <Flex w="auto" alignItems="center">
          <HeaderTitle onClick={navigateToLandingPage}>droplinked</HeaderTitle>
        </Flex>
        <Flex h="100%" alignItems="center">
          <HeaderButton onClick={toggleAuthModal}>Login</HeaderButton>
        </Flex>
      </HeaderWrapper>
      <AuthModal show={authModal} close={toggleAuthModal} />
    </>
  );
};

export default Default;
