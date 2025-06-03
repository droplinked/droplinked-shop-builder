import { Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { DocumentdownloadLg } from 'assets/icons/Action/DocumentDownload/DocumentdownloadLg'
import { DocumentdownloadMd } from 'assets/icons/Action/DocumentDownload/DocumentdownloadMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import Table from 'components/redesign/table/Table'
import useCreditsData from 'hooks/credits-and-activity/useCreditsData'
import { IDetailedTransaction } from 'lib/apis/credit/interfaces'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDateToLongStyle } from 'utils/helpers'
import StatusBadge from '../StatusBadge'
import TransactionsCards from './TransactionsCards'
import TypeColumn from './TypeColumn'

export default function TransactionsTable() {
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const downloadIcon = useBreakpointValue({
        base: <DocumentdownloadMd color='#FFF' />,
        xl: <DocumentdownloadLg color='#FFF' />
    })

    const { transactionsQuery: { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } } = useCreditsData()

    const allTransactions = data?.pages.flatMap(data => data.data.data.data) || []

    const columns: ColumnDef<IDetailedTransaction>[] = [
        {
            accessorKey: "type",
            header: "Type",
            cell: (info) => <TypeColumn type={info.getValue() as string} amountType={info.row.original.amountType} />,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: (info) => <FormattedPrice price={info.getValue() as number} fontSize={16} />,
        },
        {
            accessorKey: "createdAt",
            header: "Date",
            cell: (info) => formatDateToLongStyle(new Date(info.getValue() as string))
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => <StatusBadge status={info.getValue() as "SUCCESS" | "FAILED"} />,
        },
        {
            accessorKey: "id",
            header: "Transaction ID",
            cell: (info) => <Text color="text.white" userSelect="all">{info.getValue() as string ?? "-"}</Text>
        }
    ]

    const renderActions = (tx: IDetailedTransaction) => {
        return (
            <Link
                to={`/invoice/${tx.id}`}
                target='_blank'
                rel="noreferrer"
            >
                {downloadIcon}
            </Link>
        )
    }

    if (isMobile) return <TransactionsCards />

    return (
        <Table
            isLoading={isFetching}
            data={allTransactions}
            columns={columns}
            renderActions={renderActions}
            tableFontSize={16}
            infiniteScroll={{
                hasMore: hasNextPage,
                next: fetchNextPage,
                isFetchingNextPage,
                dataLength: allTransactions.length
            }}
        />
    )
}
