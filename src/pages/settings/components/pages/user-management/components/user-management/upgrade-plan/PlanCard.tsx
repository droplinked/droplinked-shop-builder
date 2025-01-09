import { Box, ChakraProps, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react'

interface Props {
    icon: JSX.Element;
    title: string;
    description: string;
    styles?: ChakraProps;
}

export default function PlanCard({ icon, title, description, styles }: Props) {
    return (
        <Flex {...styles}>
            <Box bg="#292929" p={2} borderRadius="8px">
                {icon}
            </Box>
            <Flex flexDir="column">
                <AppTypography color="#fff" fontSize="18px" fontWeight={700}>
                    {title}
                </AppTypography>
                <AppTypography color="#B1B1B1" fontSize="14px" fontWeight={400}>
                    {description}
                </AppTypography>
            </Flex>
        </Flex>
    )
}
