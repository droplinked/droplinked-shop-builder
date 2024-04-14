import { Box, Divider, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import CustomHeading from '../../../_components/Heading';

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    price: string;
    children?: React.ReactNode
}

function Plan({ icon, title, description, price, children }: Props) {
    return (
        <Flex
            direction={"column"}
            gap={"36px"}
            padding={"48px"}
            borderRadius={"16px"}
            border={"1px solid #fff"}
            background={"linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)"}
            boxShadow={"0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)"}
            backdropFilter={"blur(13.381682395935059px)"}
        >
            {icon}
            <Flex direction={"column"} gap={"28px"}>
                <Flex direction={"column"} gap={"16px"}>
                    <Box
                        alignSelf={"start"}
                        padding={"12px 16px"}
                        backgroundColor={"#3C3C3C"}
                        borderRadius={"8px"}
                    >
                        <CustomHeading title={title} fontSize={"16px"} />
                    </Box>
                    <AppTypography fontSize={"14px"} color={"#fff"}>Launch your token-powered shop with ease and unlock a new dimension of commerce.</AppTypography>
                </Flex>
                <Divider margin={0} backgroundColor={"#fff"} />
                <AppTypography fontSize={"48px"} color={"#fff"} fontWeight={700}>
                    {price} {" "} <Box as='span' fontSize={"28px"}>USD/USDC</Box>
                </AppTypography>
                <Divider margin={0} backgroundColor={"#fff"} />
                {children}
            </Flex>
        </Flex>
    )
}

export default Plan