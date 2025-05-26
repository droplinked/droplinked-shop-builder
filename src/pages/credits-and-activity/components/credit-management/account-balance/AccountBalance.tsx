import { Divider, Flex } from "@chakra-ui/react"
import AppDateRangePicker from "components/redesign/date-range-picker/AppDateRangePicker"
import useCreditsData from "hooks/credits-and-activity/useCreditsData"
import { getShopCredit } from "services/shop/shopServices"
import { BalanceDisplay } from "pages/credits-and-activity/components/BalanceDisplay"
import useCreditStore from "pages/credits-and-activity/stores/CreditStore"
import React from "react"
import { useQuery } from "react-query"
import { ActionButtons } from "./ActionButtons"

export default function AccountBalance() {
    const { date, isFetching: isAnalyticsFetching } = useCreditStore()
    const { refetchAll } = useCreditsData()
    const updateCreditState = useCreditStore(state => state.updateCreditState)
    const { isFetching, data, refetch: refetchShopCredit } = useQuery({
        queryKey: ["get-shop-credit", date],
        queryFn: () => getShopCredit(),
    })

    const handleRefetch = () => {
        refetchAll()
        refetchShopCredit()
    }

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
                <ActionButtons isLoading={isLoading} handleRefetchData={handleRefetch} />
                <Divider
                    display={{ base: "none", md: "block" }}
                    height={6}
                    orientation="vertical"
                    borderColor="neutral.gray.800"
                />
                <AppDateRangePicker value={date} onChange={(date) => updateCreditState("date", date)} disabled={isLoading} width={{ base: "100%", md: "auto" }} />
            </Flex>
        </Flex>
    )
}
