import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import { useQuery, useInfiniteQuery } from 'react-query'
import OverallTransactionsDisplay from '../../components/OverallTransactionsDisplay'
import Earnings from './Earnings'
import { DateRangeValue } from 'components/redesign/date-range-picker/AppDateRangePicker'
import { ITransactionType } from 'lib/apis/credit/interfaces'
import { getCreditAnalytics, getCreditDetailedAnalytics } from 'lib/apis/credit/services'

export default function OnchainTransactions() {
    const [date, setDate] = useState<DateRangeValue>(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        return [startDate, endDate];
    });
    const [dataFilter, setDataFilter] = useState<ITransactionType>(null);

    const { isFetching, data } = useQuery({
        queryKey: ["onchain-analytics", date],
        queryFn: () => getCreditAnalytics({ endDate: date[1], startDate: date[0] }),
    });

    const transactionsQuery = useInfiniteQuery({
        queryKey: ["onchain-detailed-analytics", date, dataFilter],
        queryFn: ({ pageParam = 1 }) => getCreditDetailedAnalytics({
            endDate: date[1],
            startDate: date[0],
            page: pageParam,
            limit: 20,
            type: dataFilter
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    });

    const { additions, removals } = data?.data?.data ?? {};

    return (
        <Flex flexDirection={"column"} gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <Earnings date={date} setDate={setDate} isAnalyticsFetching={isFetching} />,
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
            <TransactionsTable
                infiniteQueryResult={transactionsQuery}
                dataFilter={dataFilter}
                setDataFilter={setDataFilter}
            />
        </Flex>
    )
}
