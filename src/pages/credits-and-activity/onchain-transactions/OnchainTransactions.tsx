import { Flex } from '@chakra-ui/react'
import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import React from 'react'
import OverallTransactionsDisplay from '../components/OverallTransactionsDisplay'
import Earnings from './Earnings'
import useCreditStore from '../stores/CreditStore'
import useCredits from 'functions/hooks/credits-and-activity/useCreditsData'

export default function OnchainTransactions() {
    const { date, dataFilter, isFetching, analyticsData } = useCreditStore()
    const { transactionsQuery } = useCredits()
    const updateCreditState = useCreditStore(state => state.updateCreditState)

    const { additions, removals } = analyticsData ?? {}

    return (
        <Flex flexDirection={"column"} gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <Earnings
                            date={date}
                            setDate={(newDate) => updateCreditState('date', newDate)}
                            isAnalyticsFetching={isFetching}
                        />,
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
                setDataFilter={(filter) => updateCreditState('dataFilter', filter)}
            />
        </Flex>
    )
}
