import { Box, Flex, Image, Show, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import ContactConnections from './parts/connections/ContactConnections'

function Contact() {
    const connect = (
        <>
            <Box filter="blur(15px)" position="relative" zIndex="0"><ContactConnections /></Box>
            <Box position="relative" zIndex="1"><ContactConnections /></Box>
        </>
    )

    return (
        <Flex justifyContent="center" >
            <Flex width="95%" maxWidth="1400px" flexDirection={{ base: "column", md: "row" }} alignItems="center" gap="20px">
                <VStack width={{ base: "100%", md: "60%" }} spacing={{ base: "-30px", sm: "-60px", md: "20px" }} align="stretch" marginTop="20px">
                    <Box><AppTypography size={{ base: "18px", sm: "23px", lg: "34px" }} color="#2BCFA1" textAlign={{ base: "center", md: "left" }} weight='bolder'>Contact droplinked team</AppTypography></Box>
                    <Show below='md'><Box height={{base: "260px", sm: "320px"}} position="relative" top={{base: "38%", sm: "48%"}}>{connect}</Box></Show>
                    <Box><AppTypography size={{ base: "14px", sm: "16px", lg: "20px" }} textAlign={{ base: "center", md: "left" }} paddingTop="20px" color="#f5f5f5">
                        Are you a large retailer, brand or enterprise organization?
                        <br />
                        Droplinked provides interoperable infrastructure that scales with you
                    </AppTypography></Box>
                    <Flex paddingTop={{ base: "50px", sm: "90px", md: "20px" }} justifyContent={{ base: "center", md: "left" }}>
                        <BasicButton minWidth={{ base: "120px", sm: "160px" }} height={{ base: "32px", sm: "40px" }}>
                            <AppTypography size={{ base: "12px", sm: "16px" }}>Get Started</AppTypography>
                        </BasicButton>
                    </Flex>
                </VStack>
                {/* <Show above='md'><Box width="50%"><Image src='assets/images/homepage/contact.svg' transform="scale(1.4)" /></Box></Show> */}
                <Show above='md'><Box width="50%" position="relative">{connect}</Box></Show>
            </Flex>
        </Flex>
    )
}

export default Contact