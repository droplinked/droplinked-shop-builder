import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';
import React from 'react';
import { Box, VStack, HStack, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import AppIcons from 'assest/icon/Appicons';

interface Props {
    items: {
        title: string;
        value: number;
        color: string;
    }[]
}

export default function ProgressBar({ items }: Props) {
    const { abbreviation, convertPrice, symbol } = useCurrencyConverter();
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <VStack width="full" spacing={6} align="stretch">
            <HStack spacing={1.5}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        width={`${(item.value / total) * 100}%`}
                        bg={item.color}
                        height={"16px"}
                        borderRadius="4px"
                    />
                ))}
            </HStack>
            <HStack justifyContent={"space-between"} flexDirection={{ base: "column", sm: "row" }} flexWrap={"wrap"}>
                {items.map((item, index) => (
                    <Flex
                        key={index}
                        alignItems={"center"}
                        mr={{ base: "unset", sm: "auto" }}
                        width={{ base: "100%", sm: "unset" }}
                        gap={2}
                        justifyContent={{ base: "space-between", sm: "flex-start" }}
                        sx={{ rect: { fill: "#292929", fillOpacity: 1 } }}
                    >
                        <Flex gap={2} alignItems={"center"} >
                            <Box width={"4px"} height={"16px"} backgroundColor={item.color} borderRadius={"4px"} />
                            <AppTypography color={"#fff"} fontSize={14} fontWeight={400}>{item.title}</AppTypography>
                        </Flex>
                        <Box display={{ base: "none", sm: "block" }}>
                            <AppIcons.DotSpacer />
                        </Box>
                        <HStack gap={1} alignItems={"center"}>
                            <AppTypography color={"#fff"} fontSize={14} fontWeight={400}>
                                {symbol}{convertPrice({ amount: item.value, toUSD: false })}
                            </AppTypography>
                            <AppTypography color={"#7B7B7B"} fontSize={14} fontWeight={400}>
                                {abbreviation}
                            </AppTypography>
                        </HStack>
                    </Flex>
                ))}
            </HStack>
        </VStack>
    );
}
