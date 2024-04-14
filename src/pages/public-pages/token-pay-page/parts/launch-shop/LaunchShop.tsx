import { Flex, Heading } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function LaunchShop() {
    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            gap={"36px"}
            paddingBlock={"48px"}
            borderRadius={"16px"}
            border={"1px solid #fff"}
            background={"linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)"}
            boxShadow={"0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)"}
            backdropFilter={"blur(13.381682395935059px)"}
        >
            <Heading margin={0} fontSize={"32px"} fontWeight={700} color={"#fff"}>Launch a Token Powered Shop Today</Heading>
            <AppTypography textAlign={"center"} fontSize={"16px"} color={"#fff"} width={{ base: "100%", lg: "50%" }}>
                Launch your token powered shop with droplinked today. Simple setup, secure transactions and endless possibilities await your community.
            </AppTypography>
            <BasicButton>Get Started</BasicButton>
        </Flex>
    )
}

export default LaunchShop