import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { ReactNode } from 'react';
import Container from '../../../../../parts/container/Container';
import CustomHeading from '../../../../../parts/heading/Heading';

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
            </Flex >
        </Container >
    )
}

export default Feature