import { Divider, Flex } from "@chakra-ui/react";
import AppDateRangePicker, { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker";
import React, { useState } from "react";
import { BalanceDisplay } from "./BalanceDisplay";
import { ActionButtons } from "./ActionButtons";

export default function AccountBalance() {
    const [date, setDate] = useState<DateRangeValue>([new Date(), new Date()]);

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            p={{ base: 4, md: 6 }}
            gap={4}
            justifyContent="space-between"
            alignItems="start"
        >
            <BalanceDisplay />
            <Flex
                flexDirection={{ base: "column-reverse", md: "row" }}
                justify={{ base: "center", md: "end" }}
                alignItems="center"
                gap={6}
                width={"100%"}
            >
                <ActionButtons />
                <Divider
                    display={{ base: "none", md: "block" }}
                    height={6}
                    orientation="vertical"
                    borderColor={"#292929"}
                />
                <AppDateRangePicker value={date} onChange={setDate} />
            </Flex>
        </Flex>
    );
}
