import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import AppTypography from 'components/common/typography/AppTypography';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import React, { useContext, useMemo } from 'react'
import { ShopProductContext } from '../../context';
import DetailsProductThumbs from './parts/thumb/DetailsProductThumbs';

function DetailsProduct() {
    const { product } = useContext(ShopProductContext)
    const blockchain = useMemo(() => product.skuIDs.length ? product.skuIDs[0].recordData.recordNetwork : "", [product])

    return (
        <VStack align={"stretch"}>
            <Box><AppTypography fontSize='24px' fontWeight='bold'>{product?.title}</AppTypography></Box>
            <HStack>
                <Box><IconBlockchain blockchain={blockchain} props={{ width: "20px" }} /></Box>
                <Box><AppTypography fontSize='12px'>Dopped on <AppTypography display={"inline-block"} size={"12px"} fontWeight="bold">{capitalizeFirstLetter(blockchain)}</AppTypography> blockchain</AppTypography></Box>
            </HStack>
            <Box paddingTop={55}><Text color={"#C2C2C2"} lineHeight={1.7} fontSize="lg" dangerouslySetInnerHTML={{ __html: product?.description.substring(0, 130) }}></Text></Box>
            <DetailsProductThumbs />
        </VStack>
    )
}

export default DetailsProduct