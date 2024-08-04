import { Box, Divider, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import Container from '../../../../../parts/container/Container';
import CustomHeading from '../../../../../parts/heading/Heading';

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    price: string;
    children?: React.ReactNode
}

function Plan({ icon, title, description, price, children }: Props) {
    return (
        <Container>
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
                <Divider backgroundColor={"#fff"} />
                <AppTypography fontSize={{ base: 36, lg: 48 }} color={"#fff"} fontWeight={700} whiteSpace={"nowrap"}>
                    {price} {" "} <Box as='span' fontSize={{ base: 20, lg: 28 }} fontWeight={700}>USD/USDC</Box>
                </AppTypography>
                <Divider backgroundColor={"#fff"} />
                {children}
            </Flex>
        </Container>
    )
}

export default Plan