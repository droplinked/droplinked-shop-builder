import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//
import {
  HeaderWrapper,
  HeaderTitle,
  HeaderButton,
} from "../../HeaderLayout-style";
//
import AuthModal from "modals/auth-modal/AuthModal";

const DefaultHeaderComponent = () => {
  const [authModal, setAuthModal] = useState(false);

  const toggleAuthModal = () => setAuthModal((p) => !p);

  return (
    <>
      <HeaderWrapper>
        <Flex w="auto" alignItems="center">
          <Link to="/">
            <HeaderTitle>droplinked</HeaderTitle>
          </Link>
        </Flex>
        <Flex h="100%" alignItems="center">
          <HeaderButton onClick={toggleAuthModal}>Login</HeaderButton>
        </Flex>
      </HeaderWrapper>
      <AuthModal show={authModal} close={toggleAuthModal} />
    </>
  );
};

export default DefaultHeaderComponent;
