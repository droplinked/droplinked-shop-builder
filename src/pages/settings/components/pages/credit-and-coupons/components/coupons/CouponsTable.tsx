import React, { useState } from 'react'
import { Coupon } from './interface';
import { useQuery } from 'react-query';
import { giftcardsService } from 'lib/apis/coupons/addressServices';
import { ColumnDef } from '@tanstack/react-table';
import AmountColumn from './columns/AmountColumn';
import TypeColumn from './columns/TypeColumn';
import Table from 'components/redesign/table/Table';
import EmptyView from 'pages/settings/components/common/EmptyView';

export default function CouponsTable() {
    const [page, setPage] = useState("1");
    const [data, setData] = useState<Coupon[]>([])
    const { data: giftCardsData, isFetching } = useQuery(
        ["giftCard", page],
        () => giftcardsService({ page: page, limit: 20, search: undefined }),
        {
            onSuccess: (data) => { setData((prev) => [...prev, ...data?.data?.data?.data]) }
        }
    );
    const { hasNextPage, totalDocuments, nextPage } = giftCardsData?.data?.data ?? {};
    const handleNextPage = () => {
        setPage(nextPage);
    };
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
    ];

    if (totalDocuments === 0 && !isFetching) {
        return <EmptyView />
    }

    return (
        <Table
            infiniteScroll={{
                hasMore: hasNextPage,
                next: handleNextPage,
                isFetchingNextPage: isFetching,
                dataLength: totalDocuments ?? 0,
            }}
            isLoading={isFetching}
            data={data ?? []}
            columns={columns}
        />
    )
}
