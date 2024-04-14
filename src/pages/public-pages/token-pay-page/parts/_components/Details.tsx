import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import CustomHeading from './Heading';

interface Props {
    title: string;
    description: string;
}

function Details({ title, description }: Props) {
    return (
        <Flex direction={"column"} alignItems={"center"} gap={"24px"}>
            <CustomHeading title={title} textAlign={"center"} />
            <AppTypography width={{ md: "80%", sm: "100%" }} textAlign={"center"} fontSize={"24px"} color={"#fff"}>{description}</AppTypography>
        </Flex>
    )
}

export default Details