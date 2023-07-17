import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import casper from "assest/icon/casper.svg";
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import AppTypography from 'components/common/typography/AppTypography';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import React, { useContext, useMemo } from 'react'
import { ShopProductContext } from '../../context';

function DetailsProduct() {
    const { product } = useContext(ShopProductContext)
    const blockchain = useMemo(() => product.skuIDs.length ? product.skuIDs[0].recordData.recordNetwork : "", [product])

    return (
        <VStack align={"stretch"}>
            <Box><AppTypography size='24px' weight='bolder'>{product?.title}</AppTypography></Box>
            <HStack>
                <Box><IconBlockchain blockchain={blockchain} props={{ width: "20px" }} /></Box>
                <Box><AppTypography size='12px'>Dopped on <AppTypography display={"inline-block"} size={"12px"} weight="bolder">{capitalizeFirstLetter(blockchain)}</AppTypography> blockchain</AppTypography></Box>
            </HStack>
            <Box paddingTop={55}><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg">{product?.description.substring(0, 130)}</Text></Box>
        </VStack>
    )
}

export default DetailsProduct