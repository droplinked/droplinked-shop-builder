import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React, { useState } from 'react'
import AccountBalance from './account-balance/AccountBalance'
import { Flex } from '@chakra-ui/react'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import OverallTransactionsDisplay from '../components/OverallTransactionsDisplay'
import { useQuery, useInfiniteQuery } from 'react-query'
import { getCreditAnalytics, getCreditDetailedAnalytics } from 'lib/apis/credit/services'
import { DateRangeValue } from 'components/redesign/date-range-picker/AppDateRangePicker'
import { ITransactionType } from 'lib/apis/credit/interfaces'

export default function CreditManagement() {
    const [date, setDate] = useState<DateRangeValue>(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        return [startDate, endDate];
    });
    const [dataFilter, setDataFilter] = useState<ITransactionType>(null);

    const { isFetching, data, refetch } = useQuery({
        queryKey: ["shop-credit-analytics", date],
        queryFn: () => getCreditAnalytics({ endDate: date[1], startDate: date[0] }),
    });

    const transactionsQuery = useInfiniteQuery({
        queryKey: ["credit-detailed-analytics", date, dataFilter],
        queryFn: ({ pageParam = 1 }) => getCreditDetailedAnalytics({
            endDate: date[1],
            startDate: date[0],
            page: pageParam,
            limit: 20,
            type: dataFilter
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    });

    const handleRefetchData = () => {
        refetch();
        transactionsQuery.refetch();
    }

    const { additions, removals } = data?.data?.data ?? {};

    return (
        <Flex flexDirection="column" gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <AccountBalance date={date} setDate={setDate} isAnalyticsFetching={isFetching} handleRefetchData={handleRefetchData} />,
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
