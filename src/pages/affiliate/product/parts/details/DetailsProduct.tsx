import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import casper from "assest/icon/casper.svg";
import React from 'react'

function DetailsProduct() {
    return (
        <VStack align={"stretch"}>
            <Box><Text fontFamily={"aven"} fontSize={"3xl"}>{faker.commerce.productName()}</Text></Box>
            <Box><Text fontSize={"4xl"}>$60.00</Text></Box>
            <HStack>
                <Box><Image src={casper} width="20px" /></Box>
                <Box><Text>Dopped on <Text display={"inline-block"} fontFamily={"aven"}>Casper</Text> blockchain</Text></Box>
            </HStack>
            <Box paddingTop={55}><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{faker.lorem.paragraphs()}</Text></Box>
        </VStack>
    )
}

export default DetailsProduct