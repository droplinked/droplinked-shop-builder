import { Box, Divider, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import Container from 'pages/public-pages/landings/_components/container/Container';
import SpectrumHeader from 'pages/public-pages/landings/_components/spectrum-header/SpectrumHeader';
import React, { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
    icon: ReactNode;
    title: string;
    description: string;
    price: string;
}

function Plan({ icon, title, description, price, children }: Props) {
    return (
        <Container>
            {icon}
            <Flex direction="column" gap={7}>
                <Flex direction="column" gap={4}>
                    <Box
                        alignSelf="start"
                        padding="12px 16px"
                        backgroundColor="neutral.gray.700"
                        borderRadius={8}
                    >
                        <SpectrumHeader fontSize={16}>{title}</SpectrumHeader>
                    </Box>
                    <AppTypography fontSize={14} color="#fff">{description}</AppTypography>
                </Flex>
                <Divider backgroundColor="#fff" />
                <AppTypography fontSize={{ base: 36, lg: 48 }} color="#fff" fontWeight={700} whiteSpace="nowrap">
                    {price} {" "} <Box as='span' fontSize={{ base: 20, lg: 28 }} fontWeight={700}>USD/USDC</Box>
                </AppTypography>
                <Divider backgroundColor="#fff" />
                {children}
            </Flex>
        </Container>
    )
}

export default Plan