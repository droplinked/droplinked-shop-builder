//import "./Landing-page.style.scss"

import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Flex, Box, Image, Text, Input, Button, Spinner, AspectRatio } from '@chakra-ui/react'

import { BasicURL } from "../../sevices/functoinal-service/CallApiService"

import figmaImage1 from "../../assest/feature/home page images/figmaImage1.png"
import alertIcon from "../../assest/feature/home page images/alert.png"
import SignUpModal from "../../components/Modal/Register-modal/SignUpModal"
import LoginModal from "../../components/Modal/Login-modal/LoginModal"
import ResetPassModal from "../../components/Modal/ResetPass-modal/ResetPassModal-component"
import axios from "axios"



export default function LandingPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let x = searchParams.get("modal")

    const [showSignup, setShowSignup] = useState(false);

    const [showLogin, setLogin] = useState(() => {
        return (x == "login") ? true : false
    });

    const [showResetPass, setResetPass] = useState(false);
    const [userName, setUsername] = useState("");
    const [former, setForError] = useState(false)
    const [userNameValidation, setUserNameVaidation] = useState(false)
    const [checkshopname, setCheckshopname] = useState(false);
    const [shopnameError, setShopnameError] = useState(undefined)


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
        console.log("x");
        toggleReset();
        toggleLogin();
    }

    const changeInputValue = e => {
        setUsername(e.target.value)
        setShopnameError(undefined)
        setForError(false)
        setUserNameVaidation(false)
    }


    const landingSignin = () => {
        if (!(/^[A-Za-z0-9_]*$/.test(userName))) {
            setUserNameVaidation(true);
            return;
        }
        setCheckshopname(true);

        axios.get(`${BasicURL}/shop-name/${userName}`)
            .then(e => {
                setCheckshopname(false);
                toggleSignUp();
            })
            .catch(e => {
                console.log(e.response.data.reason);
                setCheckshopname(false);
                setShopnameError(e.response.data.reason)
            })
    }


    return (<>
        <Box display="flex" h='auto' flexDirection={{ base: "column", md: "row" }} pl={{ base: "20px", md: "80px" }} w='100%'>
            {/* inputs */}
            <Box display="flex" w={{ base: '100%', md: '50%' }} pr={{ base: "20px", md: "0px" }} mb={{ base: "70px", md: "0px" }}>
                <Flex w='100%' flexDir='column'  mt='4.5vw'>
                    <Text
                        fontWeight='600'
                        color="#fff"
                        fontSize={{ base: "40px", md: "4.7vw" }}
                        lineHeight={{ base: "52px", md: "5.5vw" }}
                    >Community <br />driven commerce</Text>

                    <Text
                        mt={{base:'25px' , md:'1.8vw'}}
                        fontWeight='400'
                        fontSize={{ base: "17px", md: '1.95vw' }}
                        lineHeight={{ base: "22px", md: '33px' }}
                        color='#f6f6f6'
                    >
                        Earn cash or crypto for sharing collections.
                    </Text>
                    <Flex
                        justifyContent='space-between'
                        w={{ base: "100%", md: "80%" }}
                        h='auto'
                        borderRadius='8px'
                        p='8px'
                        alignItems='center'
                        border='2px'
                        borderColor='#8053ff'
                        mt={{base:"36px" ,md:'3vw'}}
                       // maxH={{ base: "56px", md: "68px" }}
                    >
                        <Flex justifyContent='start' w='75%' maxW='75%'>
                            <Text
                                fontWeight='600'
                                fontSize={{ base: "16px", md: '1.7vw' }}
                                lineHeight='28px'
                                color='#fff'
                                m='auto 0px'
                                pt={{ base: "2px", md: "0px" }}
                            >droplinked.com/</Text>
                            <Input
                                type="text"
                                fontWeight='600'
                                fontSize={{ base: "16px", md: '1.7vw' }}
                                lineHeight='28px'
                                color='#fff'
                                bg='transparent'
                                m='auto 0px'
                                border='none'
                                p={{ base: "2px 0px 0px 0px", md: "0px" }}
                                _focus={{
                                    border: "none"
                                }}
                                placeholder="username"
                                className="item-input"
                                onChange={changeInputValue}
                                value={userName}
                            />
                        </Flex>
                        <Flex w='25%'>
                            <Button w='100%'
                                h={{ base: "40px", md: '100%' }}
                                justifyContent='center' alignItems='center'
                                p={{ base: "12px 20px 9px 20px", md: '12px 20px' }} bg='#8053ff' borderRadius='8px' fontWeight='600'
                                fontSize={{ base: "16px", md: '1.4vw' }}
                                textAlign='center' color='#fff' whiteSpace='nowrap' verticalAlign='middle'
                                _hover={{ bg: "#8053ff" }}
                                onClick={() => {
                                    if (userName.trim() == "") { setForError(true) }
                                    else { landingSignin() }
                                }}>
                                {(checkshopname)
                                    ?
                                    <Spinner color='white' thickness='4px' />
                                    :
                                    <>Sign up</>
                                }
                            </Button>
                        </Flex>
                    </Flex>
                    {former &&
                        <Flex h='30px' w='100%' mt={{base:'12px',md:'0.8vw'}}>
                            <Image w='20px' h='20px' m='auto 0px' src={alertIcon} alt="" />
                            <Text m='auto 0px' pl='5px' fontWeight='500' fontSize={{ base: "12px", md: '14px' }} color='#b3b3b3' lineHeight='28px'>
                                Please enter a valid username.
                            </Text>
                        </Flex>
                    }
                    {userNameValidation &&
                        <Flex h='30px' w='100%' mt={{base:'12px',md:'0.8vw'}}>
                            <Image w='20px' h='20px' m='auto 0px' src={alertIcon} alt="" />
                            <Text m='auto 0px' pl='5px' fontWeight='500' fontSize={{ base: "12px", md: '14px' }} color='#b3b3b3' lineHeight='28px'>
                                Username can contain letters (a-z), numbers (0-9) and underscores.
                            </Text>
                        </Flex>
                    }
                    {(shopnameError) &&
                        <Flex h='30px' w='100%' mt={{base:'12px',md:'0.8vw'}}>
                            <Image w='20px' h='20px' m='auto 0px' src={alertIcon} alt="" />
                            <Text m='auto 0px' pl='5px' fontWeight='500' fontSize={{ base: "12px", md: '14px' }} color='#b3b3b3' lineHeight='28px'>
                                {shopnameError}
                            </Text>
                        </Flex>
                    }

                </Flex>
            </Box>
            {/* inputs */}

            {/* image */}
            <Box w={{ base: "100%", md: "50%" }}>
                <AspectRatio ratio={1 / 1}>
                    <Box  w='100%' h='100%' pos='relative'>
                        <Image 
                        pos='absolute'
                        top='0px'
                        maxW='100%'
                         src={figmaImage1} alt="" /> 
                        </Box>
                </AspectRatio>    
            </Box>
            {/* image */}
        </Box>
        {showSignup && <SignUpModal close={toggleSignUp} shopname={userName} switchToggle={switchModal} />}
        {showLogin && <LoginModal close={toggleLogin} switchToggle={switchModal} switchReset={switchResetAndLogin} />}
        {showResetPass && <ResetPassModal backToLogin={switchResetAndLogin} close={() => { setResetPass(false) }} />}
    </>)
}