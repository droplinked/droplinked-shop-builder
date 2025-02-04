import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React, { useState } from 'react'
import AccountBalance from './account-balance/AccountBalance'
import { Flex } from '@chakra-ui/react'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import { useTransactions } from '../../hooks/useTransactions'
import OverallTransactionsDisplay from '../../components/OverallTransactionsDisplay'
import { useQuery } from 'react-query'
import { getCreditAnalytics } from 'lib/apis/credit/services'
import { DateRangeValue } from 'components/redesign/date-range-picker/AppDateRangePicker'

export default function CreditManagement() {
    const [date, setDate] = useState<DateRangeValue>(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        return [startDate, endDate];
    });
    const { isFetching, data } = useQuery({
        queryKey: ["shop-credit-analytics", date],
        queryFn: () => getCreditAnalytics({ endDate: date[1], startDate: date[0] }),
    })

    const { additions, removals } = data?.data?.data ?? {}
    const transactionsQuery = useTransactions();

    return (
        <Flex flexDirection={"column"} gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <AccountBalance date={date} setDate={setDate} isAnalyticsFetching={isFetching} />,
                        isFullWidth: true
                    },
                    {
                        content: <OverallTransactionsDisplay
                            type="inbound"
                            total={additions?.total}
                            items={additions?.breakdown}
                            isLoaded={!isFetching}
                        />,
                        isFullWidth: false
                    },
                    {
                        content: <OverallTransactionsDisplay
                            type="outbound"
                            total={removals?.total}
                            items={removals?.breakdown}
                            isLoaded={!isFetching}
                        />,
                        isFullWidth: false
                    },
                ]}
            />
            <TransactionsTable infiniteQueryResult={transactionsQuery} />
        </Flex>
    )
}
