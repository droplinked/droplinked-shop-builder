import { ColumnDef } from '@tanstack/react-table'
import AppBadge from 'components/redesign/badge/AppBadge'
import Table from 'components/redesign/table/Table'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { IOrders } from 'pages/purchase-history/interface'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import { formatUnderlinedText, getCustomerDisplayName, getStatusColorScheme } from '../../helpers'
import ControlsPopover from '../ControlsPopover'
import DateCell from './DateCell'

interface Props {
    purchaseHistoryQuery: UseInfiniteQueryResult<any, unknown>
}

export default function DesktopTable({ purchaseHistoryQuery }: Props) {
    const { t } = useLocaleResources("purchaseHistory")

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = purchaseHistoryQuery
    const orders = data?.pages.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<IOrders>[] = [
        {
            accessorKey: "_id",
            header: t("DesktopTable.orderId"),
            cell: (info) => <span style={{ userSelect: "all" }}>{info.row.original._id}</span>,
        },
        {
            accessorKey: "customerAddressBook",
            header: t("common:customer"),
            cell: (info) => {
                const { customerAddressBook, customerEmail } = info.row.original
                return getCustomerDisplayName(customerAddressBook, customerEmail)
            },
        },
        {
            accessorKey: "updatedAt",
            header: t("common:date"),
            cell: (info) => <DateCell date={info.row.original.updatedAt} />,
        },
        {
            accessorKey: "status",
            header: t("common:status"),
            cell: (info) => {
                const status = info.row.original.status
                return (
                    <AppBadge
                        text={formatUnderlinedText(status)}
                        textTransform="capitalize"
                        size='24'
                        status={getStatusColorScheme(status)}
                    />
                )
            },
        },
        {
            accessorKey: "_id",
            header: "",
            cell: (info) => (
                <ControlsPopover
                    rowData={info.row.original}
                />
            ),
        },
    ]

    return (
        <Table
            infiniteScroll={{
                hasMore: hasNextPage,
                next: fetchNextPage,
                isFetchingNextPage: isFetchingNextPage,
                dataLength: 20,
            }}
            isLoading={isFetching}
            data={orders}
            columns={columns}
            tableFontSize={16}
        />
    )
}
