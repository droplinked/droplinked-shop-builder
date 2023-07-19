import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/common/image/AppImage'
import casper from "assest/icon/casper.svg";
import React, { useContext } from 'react'
import { ModalReqDetailsStyles } from './style-component';
import { ModalRequestContext } from '../../context';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';

function ModalRequestDetails() {
    const { product, sku } = useContext(ModalRequestContext)
    const { LabelText } = ModalReqDetailsStyles

    return (
        <Flex gap={5} alignItems="center">
            <Box width={"50%"}><AppImage src={product.media && product.media[0].url} borderRadius="8px" /></Box>
            <Box width={"100%"}>
                <VStack align={"stretch"} spacing={.5}>
                    <Box marginBottom={2}><Text fontFamily={"aven"} fontSize="2xl">{product.title}</Text></Box>
                    <Box><LabelText>Commission: %{sku?.recordData?.commision}</LabelText></Box>
                    <Box><LabelText>Total Price: ${sku?.price}</LabelText></Box>
                    <Box><LabelText>Your Earning: ${sku?.amount}</LabelText></Box>
                    <Box paddingTop={1}>
                        <HStack>
                            <Box><IconBlockchain blockchain={sku?.recordData?.recordNetwork} props={{ width: "16px" }} /></Box>
                            <Box><Text fontSize={"sm"}>{capitalizeFirstLetter(sku?.recordData?.recordNetwork)}</Text></Box>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    )
}

export default ModalRequestDetails