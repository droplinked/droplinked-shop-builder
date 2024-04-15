import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { ReactNode } from 'react';
import CustomHeading from '../../../_components/Heading';

interface Props {
    icon: ReactNode
    title: string;
    description: string
}

function Feature({ icon, title, description }: Props) {
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
            < Flex direction={"column"} gap={6} >
                <CustomHeading title={title} fontSize={24} />
                <AppTypography fontSize={20} color={"#fff"}>{description}</AppTypography>
            </Flex >
        </Flex >
    )
}

export default Feature