import React from 'react'
import { Coupon } from './interface';
import { useInfiniteQuery } from 'react-query';
import { giftcardsService } from 'services/coupons/addressServices';
import { ColumnDef } from '@tanstack/react-table';
import AmountColumn from './columns/AmountColumn';
import TypeColumn from './columns/TypeColumn';
import Table from 'components/redesign/table/Table';
import EmptyView from 'pages/settings/components/common/EmptyView';
import DropDownColumn from './columns/DropDownColumn';
import CouponsEditCreationDrawer from './modals/coupons-edit-creation/CouponsEditCreationDrawer';

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function CouponsTable({ isOpen, onClose }: Props) {
    const { data, isFetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["giftCard"],
        queryFn: ({ pageParam = 1 }) => giftcardsService({
            page: pageParam.toString(),
            limit: 20,
            search: undefined
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    });

    const coupons = data?.pages.flatMap(page => page.data.data.data) || [];
    const totalDocuments = data?.pages[0]?.data.data.totalDocuments;

    const columns: ColumnDef<Coupon>[] = [
        {
            accessorKey: "name",
            header: "Title",
        },
        {
            accessorKey: "codes",
            header: "Quantity",
            cell: (info) => info.row.original.codes.length,
        },
        {
            accessorKey: "balance",
            header: "Amount",
            cell: (info) => (
                <AmountColumn
                    type={info.row.original.type}
                    balance={info.row.original.balance}
                />
            ),
        },
        {
            accessorKey: "expiryDate",
            header: "Expiration Date",
            cell: (info) => {
                const expiryDate = info.row.original.expiryDate;
                const date = new Date(expiryDate);
                const options: Intl.DateTimeFormatOptions = {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                };
                return expiryDate ? date.toLocaleDateString("en-US", options) : "---";
            },
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: (info) => (
                <TypeColumn
                    type={info.row.original.type}
                    isExpired={info.row.original.isExpired}
                />
            ),
        },
        {
            accessorKey: "codes",
            header: "",
            cell: (info) => (
                <DropDownColumn
                    refetch={refetch}
                    couponId={info.row.original._id}
                    rowData={info.row.original}
                />
            ),
            id: "ActionButtons"
        },
    ];

    if (totalDocuments === 0 && !isFetching) {
        return (
            <>
                <EmptyView />
                <CouponsEditCreationDrawer refetch={refetch} isOpen={isOpen} onClose={onClose} />
            </>
        )
    }

    return (
        <>
            <Table
                infiniteScroll={{
                    hasMore: hasNextPage,
                    next: fetchNextPage,
                    isFetchingNextPage: isFetchingNextPage,
                    dataLength: coupons.length,
                }}
                isLoading={isFetching}
                data={coupons}
                columns={columns}
                tableFontSize={16}
            />
            <CouponsEditCreationDrawer refetch={refetch} isOpen={isOpen} onClose={onClose} />
        </>
    )
}
