import { Box, HStack, Image, StackProps, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import AppTypography from 'components/common/typography/AppTypography';
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import AppTooltip from 'components/common/tooltip/AppTooltip';

interface Iprops {
    image: string
    link: string
    title?: string
    blockchain?: any
    shop?: {
        name: '',
        icon: ''
    }
    props?: StackProps
}

function AffiliateProduct({ image, title, link, blockchain, shop, props }: Iprops) {
    const dataProfile = useProfile()

    return (
        <Link to={`/${dataProfile.shop.name}/c/affiliate/shops/${link}`}>
            <VStack align={"stretch"} backgroundColor="#000" height="100%" position={"relative"} color='#FFF' borderRadius="8px" padding={{ base: "8px", xl: "15px" }} spacing="12px" {...props}>
                <Box height="120px" overflow="hidden" position="relative" background={`url(${image}) center`} backgroundSize="cover"></Box>
                {title && (
                    <AppTooltip label={title} placement="top-start"><Box height={"40px"}><AppTypography size='12px'>{title}</AppTypography></Box></AppTooltip>
                )}
                {shop && (
                    <HStack align="center">
                        <Image src={shop.icon} width="12px" height="12px" borderRadius="100%" />
                        <AppTypography size="10px" color="#2BCFA1" weight='bolder'>{shop.name}</AppTypography>
                    </HStack>
                )}
                {blockchain && (
                    <HStack height="20px">
                        <IconBlockchain blockchain={blockchain} props={{ width: "12px" }} />
                        <AppTypography size="10px">{capitalizeFirstLetter(blockchain)}</AppTypography>
                    </HStack>
                )}
            </VStack>
        </Link>
    )
}

export default AffiliateProduct