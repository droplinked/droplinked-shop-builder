import { Spinner, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react'
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

    // track each row’s download status
    const [downloadingTransactionIds, setDownloadingTransactionIds] = useState<string[]>([])

    const { download, isLoading } = useDownloadFile({
        fetcher: (transactionId: string) => downloadCreditChangeInvoice(transactionId),
        fileNameResolver: () => `${Date.now()}.xlsx`,
        onSettled: (_, __, transactionId) => setDownloadingTransactionIds(prev => prev.filter(id => id !== transactionId))
    })

    const allTransactions = data?.pages.flatMap(data => data.data.data.data) || []

    const columns: ColumnDef<IDetailedTransaction>[] = [
        {
            accessorKey: "type",
            header: t("transactionTable.columns.type"),
            cell: (info) => <TypeColumn type={info.row.original.type} amountType={info.row.original.amountType} />,
        },
        {
            accessorKey: "amount",
            header: t("transactionTable.columns.amount"),
            cell: (info) => <FormattedPrice price={info.row.original.amount} fontSize={16} />,
        },
        {
            accessorKey: "date",
            header: t("transactionTable.columns.date"),
            cell: (info) => formatDateToLongStyle(new Date(info.row.original.createdAt))
        },
        {
            accessorKey: "status",
            header: t("transactionTable.columns.status"),
            cell: (info) => <StatusBadge status={info.row.original.status} />,
        },
        {
            accessorKey: "id",
            header: t("transactionTable.columns.transactionId"),
            cell: (info) => <Text color="text.white" userSelect="all">{info.getValue() as string ?? "-"}</Text>
        }
    ]

    const handleDownload = async (transactionId: string) => {
        setDownloadingTransactionIds(prev => [...prev, transactionId])
        download(transactionId)
    }

    const renderActions = (tx: IDetailedTransaction) => {
        if (!tx.id) return null
        const isThisDownloading = downloadingTransactionIds.includes(tx.id)
        return (
            <button
                onClick={() => handleDownload(tx.id)}
                disabled={isThisDownloading || isLoading}
            >
                {isThisDownloading ? <Spinner size={{ base: 'sm', xl: 'md' }} /> : downloadIcon}
            </button>
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
