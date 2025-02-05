import { Flex } from '@chakra-ui/react'
import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import React from 'react'
import OverallTransactionsDisplay from '../components/OverallTransactionsDisplay'
import AccountBalance from './account-balance/AccountBalance'

export default function CreditManagement() {
    return (
        <Flex flexDirection="column" gap={6}>
            <FlexContainer
                items={[
                    {
                        content: <AccountBalance />,
                        isFullWidth: true
                    },
                    {
                        content: <OverallTransactionsDisplay type="inbound" />,
                        isFullWidth: false
                    },
                    {
                        content: <OverallTransactionsDisplay type="outbound" />,
                        isFullWidth: false
                    },
                ]}
            />
            <TransactionsTable />
        </Flex>
    )
}
