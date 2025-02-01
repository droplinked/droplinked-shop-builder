import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";

export const BalanceDisplay = () => {
    const { abbreviation, convertPrice } = useCurrencyConverter();

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} alignItems="start">
            <Flex p={3} bg={"#1c1c1c"} border={"1px solid #292929"} borderRadius={"8px"}>
                <AppIcons.Wallet />
            </Flex>
            <Flex flexDirection={"column"} gap={2}>
                <AppTypography color={"#fff"} fontSize={14} fontWeight={400}>
                    Account Balance
                </AppTypography>
                <Flex gap={1}>
                    <AppTypography color={"#fff"} fontSize={{ base: 20, md: 24 }} fontWeight={500}>
                        {convertPrice({ amount: 20, toUSD: false }).toFixed(2)}
                    </AppTypography>
                    <AppTypography color={"#7b7b7b"} fontSize={{ base: 20, md: 24 }} fontWeight={400}>
                        {abbreviation}
                    </AppTypography>
                </Flex>
            </Flex>
        </Flex>
    );
};
