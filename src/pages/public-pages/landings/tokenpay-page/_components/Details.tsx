import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import CustomHeading from 'pages/public-pages/landings/_components/heading/Heading';
import React from 'react';

interface Props {
    title: string;
    description: string;
}

function Details({ title, description }: Props) {
    return (
        <Flex direction={"column"} alignItems={"center"} gap={6}>
            <CustomHeading title={title} textAlign={"center"} />
            <AppTypography
                width={{ md: "80%", sm: "100%" }}
                textAlign={"center"}
                fontSize={{ base: 20, lg: 24 }}
                color={"#fff"}
            >
                {description}
            </AppTypography>
        </Flex>
    )
}

export default Details