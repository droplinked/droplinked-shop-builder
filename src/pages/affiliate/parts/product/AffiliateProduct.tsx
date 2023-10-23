import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import AppImage from 'components/common/image/AppImage';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import AppTypography from 'components/common/typography/AppTypography';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import { faker } from '@faker-js/faker';

interface Iprops {
    image: string
    link: string
    title?: string
    blockchain?: any
    shop?: {
        name: '',
        icon: ''
    }
}

function AffiliateProduct({ image, title, link, blockchain, shop }: Iprops) {
    const dataProfile = useProfile()


    return (
        <Link to={`/${dataProfile.shop.name}/c/affiliate/shops/${link}`}>
            <VStack align={"stretch"} backgroundColor={"#000"} height="100%" position={"relative"} color='#FFF' borderRadius="8px" padding={5} paddingBottom={61} spacing={4}>
                <Box><AppImage src={image} width="100%" /></Box>
                {title && <Box><AppTypography size='12px'>{title}</AppTypography></Box>}
                {blockchain && (
                    <HStack position={"absolute"} gap="0" bottom={4}>
                        <IconBlockchain blockchain={blockchain} props={{ width: "16px" }} />
                        <AppTypography size="10px">{capitalizeFirstLetter(blockchain)}</AppTypography>
                    </HStack>
                )}
                {shop && (
                    <HStack align="center">
                        <Image src={shop.icon} width="12px" height="12px" borderRadius="100%" />
                        <AppTypography size="10px" color="#2BCFA1" weight='bolder'>{shop.name}</AppTypography>
                    </HStack>
                )}
            </VStack>
        </Link>
    )
}

export default AffiliateProduct