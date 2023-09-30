import { Box, Flex, Image, Show, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Link } from 'react-router-dom'
import ContactConnections from './parts/connections/ContactConnections'

function Contact() {
    const connect = (
        <>
            <Box filter="blur(15px)" position="relative" zIndex="0"><ContactConnections /></Box>
            <Box position="relative" zIndex="1"><ContactConnections /></Box>
        </>
    )

    return (
        <Flex justifyContent="center" position="relative">
            <Flex width="80%" maxWidth="1400px" flexDirection={{ base: "column", md: "row" }} alignItems="center" gap="20px">
                <VStack width={{ base: "100%", md: "48%" }} spacing={{ base: "-30px", sm: "-60px", md: "20px" }} align="stretch" marginTop="20px">
                    <Show below='md'><Box height={{ base: "260px", sm: "320px" }} position="relative" top={{ base: "38%", sm: "40%" }}>{connect}</Box></Show>
                    <Box><AppTypography size={{ base: "14px", sm: "18px", xl: "22px" }} textAlign={{ base: "center", md: "left" }} paddingTop="20px" color="#d7d7d7">
                        Are you a large retailer, brand or enterprise organization?
                        <br />
                        Droplinked provides interoperable infrastructure that scales based on your needs. Enquire to learn more:
                    </AppTypography></Box>
                    <Flex paddingTop={{ base: "50px", sm: "90px", md: "20px" }} justifyContent={{ base: "center", md: "left" }}>
                        <Link to={'/enquiry'}>
                            <BasicButton minWidth={{ base: "120px", sm: "160px" }} height={{ base: "32px", sm: "40px" }}>
                                <AppTypography size={{ base: "12px", sm: "16px" }}>Contact Us</AppTypography>
                            </BasicButton>
                        </Link>
                    </Flex>
                </VStack>
                {/* <Show above='md'><Box width="50%"><Image src='assets/images/homepage/contact.svg' transform="scale(1.4)" /></Box></Show> */}
                <Show above='md'><Box width="50%" position="relative" top="40px" left={{ base: "80px", sm: "70px" }} transform={{ base: "scale(.9)", xl: "scale(.75)", "2xl": "scale(.8)" }}>{connect}</Box></Show>
            </Flex>
        </Flex>
    )
}

export default Contact