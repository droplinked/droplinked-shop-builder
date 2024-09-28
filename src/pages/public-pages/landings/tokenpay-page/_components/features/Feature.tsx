import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import Container from 'pages/public-pages/landings/_components/container/Container';
import CustomHeading from 'pages/public-pages/landings/_components/heading/Heading';
import React, { ReactNode } from 'react';

interface Props {
    icon: ReactNode
    title: string;
    description: string
}

function Feature({ icon, title, description }: Props) {
    return (
        <Container>
            {icon}
            < Flex direction={"column"} gap={6} >
                <CustomHeading title={title} fontSize={24} />
                <AppTypography fontSize={20} color={"#fff"}>{description}</AppTypography>
            </Flex>
        </Container>
    )
}

export default Feature