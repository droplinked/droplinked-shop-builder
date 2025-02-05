import { Divider, Flex } from "@chakra-ui/react";
import AppDateRangePicker, { DateRangeValue } from "components/redesign/date-range-picker/AppDateRangePicker";
import { BalanceDisplay } from "pages/credits-and-activity/components/BalanceDisplay";
import React from "react";
import { ActionButtons } from "./ActionButtons";
import { useQuery } from "react-query";
import { getShopCredit } from "lib/apis/shop/shopServices";

interface Props {
    date: DateRangeValue;
    setDate: (date: DateRangeValue) => void;
    isAnalyticsFetching?: boolean;
    handleRefetchData: () => void;
}

export default function AccountBalance({ date, setDate, isAnalyticsFetching, handleRefetchData }: Props) {
    const { isFetching, data } = useQuery({
        queryKey: ["get-shop-credit", date],
        queryFn: () => getShopCredit(),
    })
    const credit = data?.data?.data?.credit ?? 0
    const isLoading = isAnalyticsFetching || isFetching

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            p={{ base: 4, md: 6 }}
            gap={4}
            justifyContent="space-between"
            alignItems="start"
        >
            <BalanceDisplay amount={credit} title="Account Balance" isLoaded={!isLoading} />
            <Flex
                flexDirection={{ base: "column-reverse", md: "row" }}
                justify={{ base: "center", md: "end" }}
                alignItems="center"
                gap={6}
                width="100%"
            >
                <ActionButtons isLoading={isLoading} handleRefetchData={handleRefetchData} />
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
