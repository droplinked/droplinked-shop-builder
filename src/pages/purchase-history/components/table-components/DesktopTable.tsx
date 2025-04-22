import { ColumnDef } from '@tanstack/react-table';
import Table from 'components/redesign/table/Table'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query';
import { IOrders } from 'pages/purchase-history/interface';
import DateCell from './DateCell';
import AppBadge from 'components/redesign/badge/AppBadge';
import { formatUnderlinedText, getCustomerDisplayName, getStatusColorScheme, isOrderCancelled } from '../../helpers';
import ControlsPopover from '../ControlsPopover';

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
            cell: (info) => {
                const { customerAddressBook, customerEmail } = info.row.original;
                return getCustomerDisplayName(customerAddressBook, customerEmail);
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Date",
            cell: (info) => <DateCell date={info.row.original.updatedAt} />,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (info) => {
                const status = info.row.original.status;
                return (
                    <AppBadge
                        text={formatUnderlinedText(status)}
                        textTransform="capitalize"
                        size='24'
                        status={getStatusColorScheme(status)}
                    />
                );
            },
        },
        {
            accessorKey: "_id",
            header: "",
            cell: (info) => (
                <ControlsPopover
                    rowData={info.row.original}
                    isCancelled={isOrderCancelled(info.row.original.status)}
                />
            ),
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
