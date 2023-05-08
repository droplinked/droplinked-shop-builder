import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import casper from "assest/icon/casper.svg";
import React, { useContext } from 'react'
import { ShopProductContext } from '../../context';

function DetailsProduct() {
    const { product } = useContext(ShopProductContext)

    return (
        <VStack align={"stretch"}>
            <Box><Text fontFamily={"aven"} fontSize={"3xl"}>{product?.title}</Text></Box>
            <Box><Text fontSize={"4xl"}>${product?.shippingPrice}</Text></Box>
            <HStack>
                <Box><Image src={casper} width="20px" /></Box>
                <Box><Text>Dopped on <Text display={"inline-block"} fontFamily={"aven"}>Casper</Text> blockchain</Text></Box>
            </HStack>
            <Box paddingTop={55}><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{product?.description.substring(0, 130)}</Text></Box>
        </VStack>
    )
}

export default DetailsProduct