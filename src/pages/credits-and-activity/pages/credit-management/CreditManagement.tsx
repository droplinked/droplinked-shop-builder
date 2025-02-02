import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React from 'react'
import AccountBalance from './account-balance/AccountBalance'
import { Flex } from '@chakra-ui/react'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import { useTransactions } from '../../hooks/useTransactions'
import OverallTransactionsDisplay from '../../components/OverallTransactionsDisplay'

export default function CreditManagement() {
    const transactionsQuery = useTransactions();

    const inboundItems = [
        { title: 'Sales', value: 2500, color: '#2BCFA1' },
        { title: 'Refunds', value: 500, color: '#4A9FFF' },
        { title: 'Affiliates', value: 1000, color: '#FF8A00' }
    ];

    const outboundItems = [
        { title: 'Withdrawals', value: 1800, color: '#FF2244' },
        { title: 'Fees', value: 200, color: '#9747FF' },
        { title: 'Purchases', value: 500, color: '#4A9FFF' }
    ];

    return (
        <Flex flexDirection={"column"} gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <AccountBalance />,
                        isFullWidth: true
                    },
                    {
                        content: <OverallTransactionsDisplay
                            type="inbound"
                            total={4000}
                            items={inboundItems}
                        />,
                        isFullWidth: false
                    },
                    {
                        content: <OverallTransactionsDisplay
                            type="outbound"
                            total={2500}
                            items={outboundItems}
                        />,
                        isFullWidth: false
                    },
                ]}
            />
            <TransactionsTable infiniteQueryResult={transactionsQuery} />
        </Flex>
    )
}
