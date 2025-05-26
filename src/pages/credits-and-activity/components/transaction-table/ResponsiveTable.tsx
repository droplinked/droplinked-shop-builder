import { useMediaQuery } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppTypography from 'components/common/typography/AppTypography'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import Table from 'components/redesign/table/Table'
import useCreditsData from 'hooks/credits-and-activity/useCreditsData'
import { IDetailedTransaction } from 'services/credit/interfaces'
import React from 'react'
import StatusBadge from '../StatusBadge'
import TransactionsCards from './TransactionsCards'
import TypeColumn from './TypeColumn'
import { formatDateToLongStyle } from 'utils/helpers'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ResponsiveTable() {
    const { t } = useLocaleResources("creditsAndActivity")
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { transactionsQuery } = useCreditsData()
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = transactionsQuery
    const transactions = data?.pages.flatMap((data: { data: { data: { data: IDetailedTransaction[] } } }) => data.data.data.data) || []

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
            accessorKey: "transactionId",
            header: t("transactionTable.columns.transactionId"),
            cell: (info) => <AppTypography
                color={"#fff"}
                fontSize={16}
                fontWeight={400}
                userSelect="all"
            >
                {info.row.original.id ?? "-"}
            </AppTypography>,
        },
        // {
        //     accessorKey: "details",
        //     header: "Details",
        //     cell: (info) => <AppTooltip label={info.row.original.details} placement='bottom-start'>{info.row.original.details}</AppTooltip>,
        // },
    ]

    return (
        isSmallerThan768 ?
            <TransactionsCards />
            : <Table
                infiniteScroll={{
                    hasMore: hasNextPage,
                    next: fetchNextPage,
                    isFetchingNextPage: isFetchingNextPage,
                    dataLength: 20,
                }}
                isLoading={isFetching}
                data={transactions}
                columns={columns}
                tableFontSize={16}
            />
    )
}
