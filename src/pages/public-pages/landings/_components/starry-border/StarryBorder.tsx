import { Heading, Image, Show } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'
import Container from '../container/Container'

interface Props {
    title: string;
    description: string;
    buttonText: string;
    buttonFunctionality: () => void
}

function StarryBorder({ title, description, buttonText, buttonFunctionality }: Props) {
    return (
        <Container
            alignSelf="stretch"
            position="relative"
            alignItems="center"
            paddingBlock={12}
            sx={{ "img": { position: "absolute" } }}
        >
            <Heading margin={0} fontSize={{ base: 24, lg: 32 }} fontWeight={700} color="#fff" textAlign="center" paddingInline={{ base: 3 }}>{title}</Heading>
            <AppTypography width={{ base: "80%", lg: "60%" }} textAlign="center" fontSize={16} color="white">{description}</AppTypography>
            <Button fontWeight={500} onClick={buttonFunctionality}>{buttonText}</Button>
            <Show above='lg'>
                <Image width="150px" top="35px" right="-3px" src='assets/images/tokenpayPage/Monero.png' />
                <Image width="150px" bottom={0} left="80px" src='assets/images/tokenpayPage/Etherium.png' />
                <Image width="150px" top="-75px" left="-2%" src='assets/images/tokenpayPage/Bitcoin.png' />
                <Image width="40px" top="-30px" right="20%" src='assets/images/tokenpayPage/star-img.png' />
                <Image width="40px" bottom="-10px" right="10%" src='assets/images/tokenpayPage/star-img-1.png' />
                <Image width="40px" top="-10px" left="25%" src='assets/images/tokenpayPage/star-img-1.png' />
                <Image width="150px" bottom="-75px" right="15%" src='assets/images/tokenpayPage/LiteCoin.png' />
                <Image width="40px" bottom="-15px" left="0" src='assets/images/tokenpayPage/star-img-2.png' />
            </Show>
        </Container>
    )
}

export default StarryBorder