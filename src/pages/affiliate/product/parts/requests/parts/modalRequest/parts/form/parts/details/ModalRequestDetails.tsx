import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/common/image/AppImage'
import casper from "assest/icon/casper.svg";
import React, { useContext } from 'react'
import { ModalReqDetailsStyles } from './style-component';
import { ModalRequestContext } from '../../context';

function ModalRequestDetails() {
    const { product, sku } = useContext(ModalRequestContext)
    const { LabelText } = ModalReqDetailsStyles

    return (
        <Flex gap={5} alignItems="center">
            <Box width={"50%"}><AppImage src={product.media && product.media[0].url} borderRadius="8px" /></Box>
            <Box width={"100%"}>
                <VStack align={"stretch"} spacing={.5}>
                    <Box marginBottom={2}><Text fontFamily={"aven"} fontSize="2xl">{product.title}</Text></Box>
                    <Box><LabelText>Commission: %{sku?.recordData?.casperData?.details?.comission}</LabelText></Box>
                    <Box><LabelText>Total Price: ${sku?.recordData?.casperData?.details?.price}</LabelText></Box>
                    <Box><LabelText>Your Earning: ${sku?.recordData?.casperData?.details?.amount}</LabelText></Box>
                    <Box paddingTop={1}>
                        <HStack>
                            <Box><Image src={casper} width="16px" /></Box>
                            <Box><Text fontSize={"sm"}>Casper</Text></Box>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    )
}

export default ModalRequestDetails