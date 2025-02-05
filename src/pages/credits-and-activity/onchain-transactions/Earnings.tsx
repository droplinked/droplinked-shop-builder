import { Divider, Flex } from "@chakra-ui/react";
import AppDateRangePicker, { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker";
import React from "react";
import { BalanceDisplay } from "pages/credits-and-activity/components/BalanceDisplay";
import Select from "components/redesign/select/Select";
import { useQuery } from "react-query";
import { getShopCredit } from "lib/apis/shop/shopServices";

interface Props {
    date: DateRangeValue;
    setDate: (date: DateRangeValue) => void;
    isAnalyticsFetching?: boolean;
}

export default function Earnings({ date, setDate, isAnalyticsFetching }: Props) {
    const { isFetching, data } = useQuery({
        queryKey: ["get-wallet-balance"],
        queryFn: () => getShopCredit(),
    });

    const balance = data?.data?.data?.credit ?? 0;
    const isLoading = isAnalyticsFetching || isFetching;

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            p={{ base: 4, md: 6 }}
            gap={4}
            justifyContent="space-between"
            alignItems="start"
        >
            <BalanceDisplay amount={balance} title="Earnings" isLoaded={!isLoading} />
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justify={{ base: "center", md: "end" }}
                alignItems="center"
                gap={6}
                width="100%"
            >
                <Select
                    items={[{ title: "Merchant Wallet", value: "teateat" }]}
                    labelAccessor="title"
                    valueAccessor="value"
                    selectProps={{
                        value: null,
                        width: { base: "100%", md: "200px" },
                        isDisabled: isLoading
                    }}
                />
                <Divider
                    display={{ base: "none", md: "block" }}
                    height={6}
                    orientation="vertical"
                    borderColor="#292929"
                />
                <AppDateRangePicker value={date} onChange={setDate} disabled={isLoading} />
            </Flex>
        </Flex>
    );
}
