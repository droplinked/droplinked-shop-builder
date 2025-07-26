import { Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { DocumentdownloadLg } from 'assets/icons/Action/DocumentDownload/DocumentdownloadLg'
import { DocumentdownloadMd } from 'assets/icons/Action/DocumentDownload/DocumentdownloadMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import Table from 'components/redesign/table/Table'
import useCreditsData from 'hooks/credits-and-activity/useCreditsData'
import useDownloadFile from 'hooks/useDownloadFile/useDownloadFile'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import { IDetailedTransaction } from 'services/credit/interfaces'
import { downloadCreditChangeInvoice } from 'services/credit/services'
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

    const { t } = useLocaleResources("creditsAndActivity")

    const { transactionsQuery: { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } } = useCreditsData()

    const allTransactions = data?.pages.flatMap(data => data.data.data.data) || []

    const columns: ColumnDef<IDetailedTransaction>[] = [
        {
            accessorKey: "type",

            header: t("common:type"),
            cell: (info) => <TypeColumn type={info.getValue() as string} amountType={info.row.original.amountType} />,
        },
        {
            accessorKey: "amount",
            header: t("ResponsiveTable.columns.amount"),
            cell: (info) => <FormattedPrice price={info.getValue() as number} fontSize={16} />,
        },
        {
            accessorKey: "createdAt",
            header: t("common:date"),
            cell: (info) => formatDateToLongStyle(new Date(info.getValue() as string))
        },
        {
            accessorKey: "status",
            header: t("common:status"),
            cell: (info) => <StatusBadge status={info.getValue() as "SUCCESS" | "FAILED"} />,
        },
        {
            accessorKey: "id",
            header: t("ResponsiveTable.columns.transactionId"),
            cell: (info) => <Text color="text.white" userSelect="all">{info.getValue() as string ?? "-"}</Text>
        }
    ]

    const renderActions = (tx: IDetailedTransaction) => {
        if (!tx.id || tx.status !== "SUCCESS") return null

        return (
            <Link
                to={`/invoice/${tx.id}`}
                target='_blank'
                rel="noopener noreferrer"
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
