import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import casper from "assest/icon/casper.svg";
import { Link } from 'react-router-dom';
import AppImage from 'components/common/image/AppImage';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import AppTypography from 'components/common/typography/AppTypography';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';

interface Iprops {
    image: string
    title: string
    link: string
    blockchain: any
}

function AffiliateProduct({ image, title, link, blockchain }: Iprops) {
    const { shop } = useProfile()
    return (
        <Link to={`/${shop.name}/c/affiliate/shops/${link}`}>
            <VStack align={"stretch"} backgroundColor={"#000"} height="100%" position={"relative"} color='#FFF' borderRadius="8px" padding={5} paddingBottom={61} spacing={4}>
                <Box><AppImage src={image} width="100%" /></Box>
                <Box><AppTypography size='12px'>{title}</AppTypography></Box>
                <HStack position={"absolute"} bottom={4}>
                    <IconBlockchain blockchain={blockchain} props={{ width: "20px" }} />
                    <Text fontSize={"sm"}>Casper</Text>
                </HStack>
            </VStack>
        </Link>
    )
}

export default AffiliateProduct