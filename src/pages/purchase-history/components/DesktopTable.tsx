import { ColumnDef } from '@tanstack/react-table';
import Table from 'components/redesign/table/Table'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query';
import { IOrders } from '../interface';
import DateCell from './DateCell';
import AppBadge from 'components/redesign/badge/AppBadge';
import { formatUnderlinedText } from '../helpers';
import ControlsPopover from './ControlsPopover';

interface Props {
    purchaseHistoryQuery: UseInfiniteQueryResult<any, unknown>;
}

export default function DesktopTable({ purchaseHistoryQuery }: Props) {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = purchaseHistoryQuery;
    const orders = data?.pages.flatMap(page => page.data.data.data) || [];

    const columns: ColumnDef<IOrders>[] = [
        {
            accessorKey: "_id",
            header: "Order ID",
            cell: (info) => <span style={{ userSelect: "all" }}>{info.row.original._id}</span>,
        },
        {
            accessorKey: "customerAddressBook",
            header: "Customer",
            cell: (info) => info.row.original?.customerAddressBook ? (info.row.original.customerAddressBook.firstName + " " + info.row.original.customerAddressBook.lastName) : "---",
        },
        {
            accessorKey: "updatedAt",
            header: "Date",
            cell: (info) => <DateCell date={info.row.original.updatedAt} />,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => <AppBadge
                text={formatUnderlinedText(info.row.original.status)}
                textTransform="capitalize"
                size='24'
                status={info.row.original.status === "PAYMENT_CONFIRMED" ? "success" : info.row.original.status === "INITIALIZED_FOR_PAYMENT" ? "pending" : "error"}
            />,
        },
        {
            accessorKey: "_id",
            header: "",
            cell: (info) => <ControlsPopover id={info.row.original._id} isCancelled={info.row.original.status === "CANCELED"} />,
        },
    ];

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
