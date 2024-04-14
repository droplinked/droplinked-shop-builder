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
            gap={"36px"}
            padding={"48px 56px"}
            borderRadius={"16px"}
            border={"1px solid #fff"}
            background={"linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)"}
            boxShadow={"0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)"}
            backdropFilter={"blur(13.381682395935059px)"}
        >
            {icon}
            < Flex direction={"column"} gap={"24px"} >
                <CustomHeading title={title} fontSize={"24px"} />
                <AppTypography fontSize={"20px"} color={"#fff"}>{description}</AppTypography>
            </Flex >
        </Flex >
    )
}

export default Feature