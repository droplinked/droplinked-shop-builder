import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import React from 'react'

interface Props {
    title: string;
    description: string;
    children: React.ReactNode
}

function Details({ title, description, children }: Props) {
    return (
        <Flex direction={"column"} gap={20}>
            <Flex direction={"column"} gap={6}>
                <CustomHeading title={title} fontSize={36} textAlign={"center"}></CustomHeading>
                <AppTypography fontSize={20} color={"#fff"} textAlign={"center"}>{description}</AppTypography>
            </Flex>
            {children}
        </Flex>
    )
}

export default Details