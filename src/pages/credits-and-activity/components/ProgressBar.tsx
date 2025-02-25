import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { IBreakDown } from 'lib/apis/credit/interfaces';
import React from 'react';
import { getColor } from '../utils/colorHelpers';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';

interface Props {
    items: IBreakDown[]
    type: "inbound" | "outbound";
}

export default function ProgressBar({ items, type }: Props) {
    const sortedItems = [...items].sort((a, b) => b.amount - a.amount);
    const total = sortedItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <VStack width="full" spacing={6} align="stretch">
            <HStack spacing={1.5}>
                {sortedItems.map((item, index) => (
                    <Box
                        key={index}
                        width={`${(item.amount / total) * 100}%`}
                        bg={getColor(index, sortedItems, type)}
                        height="16px"
                        borderRadius="4px"
                    />
                ))}
            </HStack>
            <HStack justifyContent="space-between" flexDirection={{ base: "column", sm: "row" }} flexWrap="wrap">
                {sortedItems.map((item, index) => (
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
                                backgroundColor={getColor(index, sortedItems, type)}
                                borderRadius="4px"
                            />
                            <AppTypography color="#fff" fontSize={14} fontWeight={400}>{item.reason}</AppTypography>
                        </Flex>
                        <Box display={{ base: "none", sm: "block" }}>
                            <AppIcons.DotSpacer />
                        </Box>
                        <FormattedPrice price={item.amount} fontSize={14} fontWeight={400} />
                    </Flex>
                ))}
            </HStack>
        </VStack>
    );
}
