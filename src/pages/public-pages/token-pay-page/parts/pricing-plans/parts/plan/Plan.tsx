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
            gap={9}
            padding={{ base: 7, lg: "48px 56px" }}
            borderRadius={16}
            border={"1px solid #fff"}
            background={"linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)"}
            boxShadow={"0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)"}
        >
            {icon}
            <Flex direction={"column"} gap={7}>
                <Flex direction={"column"} gap={4}>
                    <Box
                        alignSelf={"start"}
                        padding={"12px 16px"}
                        backgroundColor={"#3C3C3C"}
                        borderRadius={8}
                    >
                        <CustomHeading title={title} fontSize={16} />
                    </Box>
                    <AppTypography fontSize={14} color={"#fff"}>{description}</AppTypography>
                </Flex>
                <Divider margin={0} backgroundColor={"#fff"} />
                <AppTypography fontSize={{ base: 36, lg: 48 }} color={"#fff"} fontWeight={700} whiteSpace={"nowrap"}>
                    {price} {" "} <Box as='span' fontSize={{ base: 20, lg: 28 }} fontWeight={700}>USD/USDC</Box>
                </AppTypography>
                <Divider margin={0} backgroundColor={"#fff"} />
                {children}
            </Flex>
        </Flex>
    )
}

export default Plan