import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import CustomHeading from '../heading/Heading';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode
}

function Details({ title, description, children }: Props) {
    return (
        <Flex
            width={"100%"}
            direction={"column"}
            gap={{ base: 12, lg: 20 }}
        >
            <Flex direction={"column"} gap={{ base: 2, lg: 4 }} sx={{ textAlign: "center" }}>
                <CustomHeading title={title} fontSize={{ base: 20, lg: 28 }} />
                <AppTypography fontSize={{ base: 16, xl: 18 }} color={"#fff"}>{description}</AppTypography>
            </Flex>
            {children}
        </Flex>
    )
}

export default Details