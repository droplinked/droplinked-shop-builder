
import { useState } from "react"
import { Flex, Image, Text, Input, Button, Spinner, } from '@chakra-ui/react'
import { checkShopname } from "../../api/public/CheckShopname-api"

import alertIcon from "../../assest/feature/home page images/alert.png"



const SignupInput = ({ setUsername, userName, toggleSignUp }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ERRORS_TYPE = {
        EMPTY_ERROR: "Please enter a name to proceed",
        VALIDATION_ERROR: "Usernames may contain letters (a-z), numbers (0-9) and special characters"
    }

    // onchange signup input
    const changeInputValue = e => {
        setUsername(e.target.value)
        setError(null)
    }

    // check shopname
    const clickSignin = async () => {
        // validation shop name 
        if (userName.trim() == "") {
            setError(ERRORS_TYPE.EMPTY_ERROR)
            return
        }
        if (!(/^[A-Za-z0-9_]*$/.test(userName))) {
            setError(ERRORS_TYPE.VALIDATION_ERROR)
            return;
        }

        setLoading(true);
        let result = await checkShopname(userName);
        if (result == true) toggleSignUp();
        else setError(result)
        setLoading(false);
    }

    return (
        <>
            <Flex
                justifyContent='space-between'
                w={{ base: "100%", md: "80%" }}
                h='auto'
                borderRadius='8px'
                p='8px'
                alignItems='center'
                border='2px'
                borderColor='#8053ff'
                mt={{ base: "36px", md: '3vw' }}
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
                        onClick={clickSignin}>
                        {(loading)
                            ?
                            <Spinner color='white' thickness='4px' />
                            :
                            <>Sign up</>
                        }
                    </Button>
                </Flex>
            </Flex>
            {error &&
                <Flex h='30px' w='100%' mt={{ base: '12px', md: '0.8vw' }}>
                    <Image w='20px' h='20px' m='auto 0px' src={alertIcon} alt="" />
                    <Text m='auto 0px' pl='5px' fontWeight='500' fontSize={{ base: "12px", md: '14px' }} color='#b3b3b3' lineHeight='28px'>
                        {error}
                    </Text>
                </Flex>
            }
        </>
    )
}

export default SignupInput