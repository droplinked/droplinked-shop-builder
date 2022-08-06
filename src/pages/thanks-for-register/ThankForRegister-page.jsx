
import { Flex, Text, Box } from "@chakra-ui/react"
import { resendEmail } from "../../api/public/ResendEmail-api"
import { useState } from "react"
import { useToasty } from "../../context/toastify/ToastContext"

import BasicButton from "../../components/shared/BasicButton/BasicButton"

export default function ThankForRegisterPage() {

    // use this state for loading state of button when calling api
    const [loading, setLoading] = useState(false)

    const { successToast, errorToast } = useToasty();

    // get email from localhost for show register email in text 
    let email = JSON.parse(localStorage.getItem('registerEmail'));


    const resend = async () => {
        // set in loading state until get data
        setLoading(true)
        // call resent email api
        let result = await resendEmail(email)
        console.log(result);
        // if get error from api
        if (result == false) {
            errorToast("Not Found or Verified")
        } else {
            // if call successfully
            successToast("A new link was sent to your email")
        }
        setLoading(false)
    }

    return (
        <Flex
            w='100%'
            px={{ base: "20px", md: '80px' }}
            h='auto'
            flexDirection='column'
            alignItems='center'
        >
            <Text
                color='#fff'
                fontSize={{ base: '30px', sm: '40px', md: '50px' , lg:'60px' }}
                mb='10px'
            >
                Thank you!
            </Text>

            <Text
                color='#fff'
                fontSize={{ base: '12px' , sm:'14px', md: '16px', lg: '22px' }}
                fontWeight='400'
                textAlign='center'
                mb={{ base: '40px', md: '50px' }}
              //  whiteSpace='nowrap'
            >
                We've sent a confirmation email to
                <Text as="span" color='#fff' bgColor='transparent' fontStyle='avenir' fontWeight='600'> "{email}"</Text>
                . Please check your email inbox.
            </Text>


            <Box w={{sm:"150px" , md:'200px'}}>
                <BasicButton
                    click={resend}
                    loading={loading}
                >Resend the link</BasicButton>
            </Box>

        </Flex>
    )
}