
import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Flex, Box, Text,  keyframes, usePrefersReducedMotion } from '@chakra-ui/react'


import LandingpageImage from "./landing-page-image-component"
import SignupInput from "./singup-input-component"
import SignUpModal from "../../components/Modal/Register-modal/SignUpModal"
import LoginModal from "../../components/Modal/Login-modal/LoginModal"
import ResetPassModal from "../../components/Modal/ResetPass-modal/ResetPassModal-component"

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
    let urlParam = searchParams.get("modal")


    // show login modal
    const [showLogin, setLogin] = useState(() => {
        return (urlParam == "login") ? true : false
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


    const toggleSignUp = () => {
        setShowSignup(p => !p)
    }

    const toggleLogin = () => {
        setLogin(p => !p)
    }

    const toggleReset = () => {
        setResetPass(p => !p)
    }

    const switchModal = () => {
        toggleSignUp();
        toggleLogin();
    }

    const switchResetAndLogin = () => {
        toggleReset();
        toggleLogin();
    }

 


    return (<>
        <Box display="flex" h='auto' flexDirection={{ base: "column", md: "row" }} pl={{ base: "20px", md: "80px" }} w='100%'>
            {/* inputs */}
            <Box display="flex" w={{ base: '100%', md: '50%' }} pr={{ base: "20px", md: "0px" }} mb={{ base: "70px", md: "0px" }}>
                <Flex w='100%' flexDir='column' mt='4.5vw'
                    animation={leftsideAnimation}>
                    <Text

                        fontWeight='600'
                        color="#fff"
                        fontSize={{ base: "40px", md: "4.7vw" }}
                        lineHeight={{ base: "52px", md: "5.5vw" }}
                    >Community <br />driven commerce</Text>

                    <Text
                        mt={{ base: '25px', md: '1.8vw' }}
                        fontWeight='400'
                        fontSize={{ base: "17px", md: '1.95vw' }}
                        lineHeight={{ base: "22px", md: '33px' }}
                        color='#f6f6f6'
                    >
                        Earn cash or crypto for sharing collections.
                    </Text>
                    <SignupInput
                            setUsername={setUsername}
                            userName={userName}
                            toggleSignUp={toggleSignUp}
                        />
                </Flex>
            </Box>
            {/* inputs */}
            {/* image */}
            <LandingpageImage />
            {/* image */}
        </Box>
        {showSignup && <SignUpModal close={toggleSignUp} shopname={userName} switchToggle={switchModal} />}
        {showLogin && <LoginModal close={toggleLogin} switchToggle={switchModal} switchReset={switchResetAndLogin} />}
        {showResetPass && <ResetPassModal backToLogin={switchResetAndLogin} close={() => { setResetPass(false) }} />}
    </>)
}
