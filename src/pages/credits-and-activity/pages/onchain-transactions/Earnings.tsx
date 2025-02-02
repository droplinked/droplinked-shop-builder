import { Flex } from "@chakra-ui/react";
import AppDateRangePicker, { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker";
import React, { useState } from "react";
import { BalanceDisplay } from "pages/credits-and-activity/components/BalanceDisplay";
import Select from "components/redesign/select/Select";

export default function Earnings() {
    const [date, setDate] = useState<DateRangeValue>([new Date(), new Date()]);

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            p={{ base: 4, md: 6 }}
            gap={4}
            justifyContent="space-between"
            alignItems="start"
        >
            <BalanceDisplay amount={20} title="Earnings" />
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justify={{ base: "center", md: "end" }}
                alignItems="center"
                gap={3}
                width={"100%"}
            >
                <Select
                    items={[{ title: "Merchant Wallet", value: "teateat" }]}
                    labelAccessor="title"
                    valueAccessor="value"
                    selectProps={{ value: null, width: { base: "100%", md: "200px" } }}
                />

                <AppDateRangePicker value={date} onChange={setDate} />
            </Flex>
        </Flex>
    );
}
