import { useMediaQuery } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useCreditsData from 'hooks/credits-and-activity/useCreditsData'
import TransactionsTable from 'pages/credits-and-activity/components/transaction-table/TransactionsTable'
import React from 'react'
import AccountBalance from './account-balance/AccountBalance'
import OverallTransactionsDisplay from '../OverallTransactionsDisplay'

export default function CreditManagement() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { transactionsQuery } = useCreditsData()
    const { data } = transactionsQuery
    const isEmpty = data?.pages?.[0]?.data?.data?.totalDocuments === 0

    return (
        <>
            <RuledGrid columns={1} borderRadius="8px" overflow="hidden" mb={6}>
                <AccountBalance />

                <RuledGrid columns={isSmallerThan768 ? 1 : 2} nested overflow="hidden">
                    <OverallTransactionsDisplay type="inbound" />
                    <OverallTransactionsDisplay type="outbound" />
                </RuledGrid>

            </RuledGrid>

            {!isEmpty && <TransactionsTable />}
        </>
    )
}
