import { Divider, Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import Button from "components/redesign/button/Button";
import AppDateRangePicker, { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React, { useState } from "react";

export default function AccountBalance() {
    const { abbreviation, convertPrice } = useCurrencyConverter();
    const [date, setDate] = useState<DateRangeValue>([new Date(), new Date()]);

    return (
        <Flex flexDirection={{ base: "column", md: "row" }} gap={4} justifyContent="space-between" alignItems="start">
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
            <Flex flexDirection={{ base: "column-reverse", md: "row" }} justify={{ base: "center", md: "end" }} alignItems="center" gap={6} width={"100%"}>
                <Flex flexDirection={"row"} gap={{ base: 4, md: 6 }} alignItems="center" width={{ base: "100%", md: "auto" }}>
                    <Button flex={{ base: 1, md: "unset" }} fontSize={14} fontWeight={500} leftIcon={<AppIcons.SendMoney />} width={{ base: "50%", md: "min-content" }}>
                        Withdraw
                    </Button>
                    <Button flex={{ base: 1, md: "unset" }} fontSize={14} fontWeight={500} leftIcon={<AppIcons.RecieveMoney />} width={{ base: "50%", md: "min-content" }}>
                        Add Credit
                    </Button>
                </Flex>
                <Divider display={{ base: "none", md: "block" }} height={6} orientation="vertical" borderColor={"#292929"} />
                <AppDateRangePicker value={date} onChange={setDate} />
            </Flex>
        </Flex>
    );
}
