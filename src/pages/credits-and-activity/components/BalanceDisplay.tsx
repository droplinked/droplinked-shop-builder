import { Flex } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import AppTypography from "components/common/typography/AppTypography";
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";

interface Props {
    title: string;
    amount: number;
    isLoaded: boolean;
}

export const BalanceDisplay = ({ title, amount, isLoaded }: Props) => {
    const { abbreviation, convertPrice, symbol } = useCurrencyConverter();

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} alignItems="start">
            <Flex p={3} bg="neutral.gray.1000" border="1px solid" borderColor="neutral.gray.800" borderRadius="8px">
                <AppIcons.Wallet />
            </Flex>
            <Flex flexDirection="column" gap={2}>
                <AppTypography color="neutral.white" fontSize={14} fontWeight={400}>
                    {title}
                </AppTypography>
                <AppSkeleton isLoaded={isLoaded} borderRadius={8}>
                    <Flex gap={1}>
                        <AppTypography color="neutral.white" fontSize={{ base: 20, md: 24 }} fontWeight={500}>
                            {symbol}{convertPrice({ amount: amount, toUSD: false }).toFixed(2)}
                        </AppTypography>
                        <AppTypography color="text.subtextPlaceholder.dark" fontSize={{ base: 20, md: 24 }} fontWeight={400}>
                            {abbreviation}/USDC
                        </AppTypography>
                    </Flex>
                </AppSkeleton>
            </Flex>
        </Flex>
    );
};
