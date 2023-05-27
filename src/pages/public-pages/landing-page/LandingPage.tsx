import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  keyframes,
  usePrefersReducedMotion,
  Flex,
  Box,
} from "@chakra-ui/react";
//
import {
  LandingPageWrapper,
  InputContainrt,
  TextUp,
  Text2,
  TextContainer,
  SpaceBox,
} from "./LandingPage-style";
import { useProfile } from "functions/hooks/useProfile/useProfile";
//
import BasicButton from 'components/common/BasicButton/BasicButton';
import MainImageComponent from "./components/main-image-component/MainImageComponent";
import IconsComponent from "./components/icons-component/IconsComponent";
import SignupInputComponent from "./components/signup-input-component/SignupInputComponent";
import AuthModal from "components/modals/auth-modal/AuthModal";
import LogoSliderComponent from "./components/logo-slider-component/LogoSliderComponent";

const keyframe_leftanimation = keyframes`
0% {
    transform: translateX(-200px);
    opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;

export default function LandingPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { shop } = useProfile();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [userName, setUsername] = useState("");
  // loading button
  const leftsideAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_leftanimation}  1s linear`;

  useEffect(() => {
    if (shop) {
      //  navigate(`/${shop.name}/products`);
    }
  }, []);

  const toggleModal = () => setShowAuthModal((p) => !p);

  const navigateToEnquiry = () => navigate("/enquiry");

  return (
    <Box pt="50px" pb="100px">
      <LandingPageWrapper overflowX={"hidden"}>
        {/* inputs */}
        <InputContainrt>
          <TextContainer animation={leftsideAnimation}>
            <TextUp>
              Community <br />
              driven commerce
            </TextUp>

            <Text2>Earn cash or crypto for sharing collections.</Text2>
            <SignupInputComponent
              setUsername={setUsername}
              userName={userName}
              toggleSignUp={toggleModal}
            />
          </TextContainer>
        </InputContainrt>
        {/* inputs */}
        {/* image */}
        <MainImageComponent />
        {/* image */}
      </LandingPageWrapper>
      <SpaceBox></SpaceBox>
      <IconsComponent />
      <SpaceBox></SpaceBox>
      <Flex w="100%" justifyContent="center" px={{ base: "20px", md: "80px" }}>
        <BasicButton color="white" onClick={navigateToEnquiry}>
          Enquire to learn more
        </BasicButton>
      </Flex>
      <SpaceBox></SpaceBox>
      <Box mb="36px" />
      <LogoSliderComponent />
      <AuthModal
        show={showAuthModal}
        close={toggleModal}
        shopName={userName}
        type="SIGNUP"
      />
    </Box>
  );
}
