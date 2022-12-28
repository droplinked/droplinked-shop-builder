import { useState, lazy, Suspense , useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  keyframes,
  usePrefersReducedMotion,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  LandingPageWrapper,
  InputContainrt,
  TextUp,
  Text2,
  TextContainer,
  SpaceBox,
} from "./Landing-page-style";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import LandingpageImage from "./components/landing-page-image-component";
import LandingIcons from "./components/landing-icons-component";
import SignupInput from "./components/singup-input-component";

import { useProfile } from "../../../context/profile/ProfileContext";

const SignUpModal = lazy(() =>
  import("../../../components/Modal/Register/SignUpModal")
);

const LoginModal = lazy(() =>
  import("../../../components/Modal/Login/login-modal")
);

const ResetPassModal = lazy(() =>
  import("../../../components/Modal/ResetPass/ResetPassModal-component")
);

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
  let [searchParams, setSearchParams] = useSearchParams();
  let urlParam = searchParams.get("modal");

  const { profile } = useProfile()
  const navigate = useNavigate();

  // show login modal
  const [showLogin, setLogin] = useState(() => {
    return urlParam == "login" ? true : false;
  });
  // show signup modal
  const [showSignup, setShowSignup] = useState(false);
  // show reset pass modal
  const [showResetPass, setResetPass] = useState(false);

  const [userName, setUsername] = useState("");
  // loading button

  const leftsideAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_leftanimation}  1s linear`;

    useEffect(()=>{
      if(profile && (profile.type == "PRODUCER")){
        navigate(`/${profile.shopName}`);
      }
    },[])

  const toggleSignUp = () => {
    setShowSignup((p) => !p);
  };

  const toggleLogin = () => {
    setLogin((p) => !p);
  };

  const toggleReset = () => {
    setResetPass((p) => !p);
  };

  const switchModal = () => {
    toggleSignUp();
    toggleLogin();
  };

  const switchResetAndLogin = () => {
    toggleReset();
    toggleLogin();
  };
  const navigateToEnquiry = () => navigate("/enquiry");

  return (
    <Box  pt='50px' pb='100px'>
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
              toggleSignUp={toggleSignUp}
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

      <Suspense fallback={<></>}>
        {showSignup && (
          <SignUpModal
            close={toggleSignUp}
            shopname={userName}
            switchToggle={switchModal}
          />
        )}
        {showLogin && (
          <LoginModal
            close={toggleLogin}
            switchToggle={switchModal}
            switchReset={switchResetAndLogin}
          />
        )}
        {showResetPass && (
          <ResetPassModal
            backToLogin={switchResetAndLogin}
            close={() => {
              setResetPass(false);
            }}
          />
        )}
      </Suspense>
    </Box>
  );
}
