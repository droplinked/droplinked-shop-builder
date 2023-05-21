import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import casper from "assest/icon/casper.svg";
import AppTypography from 'common/typography/AppTypography';
import React, { useContext } from 'react'
import { ShopProductContext } from '../../context';

function DetailsProduct() {
    const { product } = useContext(ShopProductContext)

    return (
        <VStack align={"stretch"}>
            <Box><AppTypography size='24px' weight='bolder'>{product?.title}</AppTypography></Box>
            <HStack>
                <Box><Image src={casper} width="20px" /></Box>
                <Box><AppTypography size='12px'>Dopped on <AppTypography display={"inline-block"} size={"12px"} weight="bolder">Casper</AppTypography> blockchain</AppTypography></Box>
            </HStack>
            <Box paddingTop={55}><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{product?.description.substring(0, 130)}</Text></Box>
        </VStack>
    )
}

export default DetailsProduct