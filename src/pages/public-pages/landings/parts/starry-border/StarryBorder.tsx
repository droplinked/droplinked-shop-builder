import React from 'react'
import Container from '../container/Container'
import { Heading, Image, Show } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import BasicButton from 'components/common/BasicButton/BasicButton'

function StarryBorder() {
    return (
        <Container
            alignSelf={"stretch"}
            position={"relative"}
            alignItems={"center"}
            paddingBlock={12}
        >
            <Heading margin={0} fontSize={{ base: 24, lg: 32 }} fontWeight={700} color={"#fff"} textAlign={"center"} paddingInline={{ base: 3 }}>
            Launch a Store Today
            </Heading>
            <AppTypography textAlign={"center"} fontSize={16} color={"#fff"} width={{ base: "80%", lg: "60%" }}>
            Simple setup, secure transactions and endless possibilities await your community.
            </AppTypography>
            <BasicButton>Get Started</BasicButton>
            <Show above='lg'>
                <Image width={"150px"} position={"absolute"} top={"35px"} right={"-3px"} src='assets/images/tokenPayPage/Monero.png' />
                <Image width={"150px"} position={"absolute"} bottom={0} left={"80px"} src='assets/images/tokenPayPage/Etherium.png' />
                <Image width={"150px"} position={"absolute"} top={"-75px"} left={"-2%"} src='assets/images/tokenPayPage/Bitcoin.png' />
                <Image width={"40px"} position={"absolute"} top={"-30px"} right={"20%"} src='assets/images/tokenPayPage/star-img.png' />
                <Image width={"40px"} position={"absolute"} bottom={"-10px"} right={"10%"} src='assets/images/tokenPayPage/star-img-1.png' />
                <Image width={"40px"} position={"absolute"} top={"-10px"} left={"25%"} src='assets/images/tokenPayPage/star-img-1.png' />
                <Image width={"150px"} position={"absolute"} bottom={"-75px"} right={"15%"} src='assets/images/tokenPayPage/LiteCoin.png' />
                <Image width={"40px"} position={"absolute"} bottom={"-15px"} left={"0"} src='assets/images/tokenPayPage/star-img-2.png' />
            </Show>
        </Container>
    )
}

export default StarryBorder