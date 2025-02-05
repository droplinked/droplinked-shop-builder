import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter';
import { IBreakDown } from 'lib/apis/credit/interfaces';
import React from 'react';
import { getColor } from '../utils/colorHelpers';

interface Props {
    items: IBreakDown[]
    type: "inbound" | "outbound";
}

export default function ProgressBar({ items, type }: Props) {
    const { abbreviation, convertPrice, symbol } = useCurrencyConverter();
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <VStack width="full" spacing={6} align="stretch">
            <HStack spacing={1.5}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        width={`${(item.amount / total) * 100}%`}
                        bg={getColor(index, items, type)}
                        height="16px"
                        borderRadius="4px"
                    />
                ))}
            </HStack>
            <HStack justifyContent="space-between" flexDirection={{ base: "column", sm: "row" }} flexWrap="wrap">
                {items.map((item, index) => (
                    <Flex
                        key={index}
                        alignItems="center"
                        mr={{ base: "unset", sm: "auto" }}
                        width={{ base: "100%", sm: "unset" }}
                        gap={2}
                        justifyContent={{ base: "space-between", sm: "flex-start" }}
                        sx={{ rect: { fill: "#292929", fillOpacity: 1 } }}
                    >
                        <Flex gap={2} alignItems="center" >
                            <Box
                                width="4px"
                                height="16px"
                                backgroundColor={getColor(index, items, type)}
                                borderRadius="4px"
                            />
                            <AppTypography color="#fff" fontSize={14} fontWeight={400}>{item.reason}</AppTypography>
                        </Flex>
                        <Box display={{ base: "none", sm: "block" }}>
                            <AppIcons.DotSpacer />
                        </Box>
                        <HStack gap={1} alignItems="center">
                            <AppTypography color="#fff" fontSize={14} fontWeight={400}>
                                {symbol}{convertPrice({ amount: item.amount, toUSD: false })}
                            </AppTypography>
                            <AppTypography color="#7B7B7B" fontSize={14} fontWeight={400}>
                                {abbreviation}
                            </AppTypography>
                        </HStack>
                    </Flex>
                ))}
            </HStack>
        </VStack>
    );
}
