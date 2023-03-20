import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  keyframes,
  usePrefersReducedMotion,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";

import {
  LandingPageWrapper,
  InputContainrt,
  TextUp,
  Text2,
  TextContainer,
  SpaceBox,
} from "./Landing-page-style";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../../store/profile/profile.selector";
import { useProfile } from "../../../hooks/useProfile/useProfile";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import LandingpageImage from "./components/landing-page-image-component";
import LandingIcons from "./components/landing-icons-component";
import SignupInput from "./components/singup-input-component";
import AuthModal from "../../../modals/auth/AuthModal";
import LogoSlider from "./components/logo-slider/LogoSlider";

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

  const { profile, shop } = useProfile();
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
      <LandingPageWrapper>
        {/* inputs */}
        <InputContainrt>
          <TextContainer animation={leftsideAnimation}>
            <TextUp>
              Community <br />
              driven commerce
            </TextUp>

            <Text2>Earn cash or crypto for sharing collections.</Text2>
            <SignupInput
              setUsername={setUsername}
              userName={userName}
              toggleSignUp={toggleModal}
            />
          </TextContainer>
        </InputContainrt>
        {/* inputs */}
        {/* image */}
        <LandingpageImage />
        {/* image */}
      </LandingPageWrapper>

      <SpaceBox></SpaceBox>

      <LandingIcons />

      <SpaceBox></SpaceBox>

      <Flex w="100%" justifyContent="center" px={{ base: "20px", md: "80px" }}>
        <Box w={{ base: "100%", md: "400px" }}>
          <BasicButton color="white" click={navigateToEnquiry}>
            Enquire to learn more
          </BasicButton>
        </Box>
      </Flex>

      <SpaceBox></SpaceBox>
      {/* <Flex w="100%" justifyContent="center" mb="36px">
        <Text color='white' fontSize='36px' fontWeight='700'  >Droplinked web3 partners</Text>
      </Flex> */}
      <Box mb="36px" />

      <LogoSlider />

      <AuthModal
        show={showAuthModal}
        close={toggleModal}
        shopName={userName}
        type="SIGNUP"
      />
    </Box>
  );
}
