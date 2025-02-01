import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React from 'react'
import AccountBalance from './components/account-balance/AccountBalance'
import Inbound from './components/inbound/Inbound'
import Outbound from './components/outbound/Outbound'
import { Flex } from '@chakra-ui/react'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import { useTransactions } from '../../hooks/useTransactions'

export default function CreditManagement() {
    const transactionsQuery = useTransactions();

    return (
        <Flex flexDirection={"column"} gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <AccountBalance />,
                        isFullWidth: true
                    },
                    {
                        content: <Inbound />,
                        isFullWidth: false
                    },
                    {
                        content: <Outbound />,
                        isFullWidth: false
                    },
                ]}
            />
            <TransactionsTable infiniteQueryResult={transactionsQuery} />
        </Flex>
    )
}
