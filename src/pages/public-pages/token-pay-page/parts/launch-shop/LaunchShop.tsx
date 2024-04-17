import { Heading } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Container from '../_components/Container'

function LaunchShop() {
    return (
        <Container
            alignSelf={"stretch"}
            position={"relative"}
            alignItems={"center"}
            paddingBlock={12}
        >
            <Heading margin={0} fontSize={{ base: 24, lg: 32 }} fontWeight={700} color={"#fff"} textAlign={"center"} paddingInline={{ base: 3 }}>Launch a Token Powered Shop Today</Heading>
            <AppTypography textAlign={"center"} fontSize={16} color={"#fff"} width={{ base: "80%", lg: "60%" }}>
                Launch your token powered shop with droplinked today. Simple setup, secure transactions and endless possibilities await your community.
            </AppTypography>
            <BasicButton>Get Started</BasicButton>
            {/* <Image width={"160px"} position={"absolute"} top={"10px"} right={"10px"} src='assets/images/tokenPayPage/Monero.png' />
            <Image width={"160px"} position={"absolute"} bottom={0} left={{ base: 0, lg: "80px" }} src='assets/images/tokenPayPage/Etherium.png' /> */}
        </Container>
    )
}

export default LaunchShop