import PageGrid from 'components/redesign/page-grid/PageGrid';
import React, { useState } from 'react';
import EmptyView from './components/EmptyView';
import ExportButton from './components/ExportButton';
import HistoryTable from './components/HistoryTable';
import { useInfiniteQuery } from 'react-query';
import { ordersServices } from 'lib/apis/orders/orderServices';
import useDebounce from 'hooks/debounce/useDebounce';

export default function PurchaseHistory() {
    const [searchValue, setSearchValue] = useState("")
    const [statusValue, setStatusValue] = useState("")
    const debouncedSearchValue = useDebounce(searchValue, 1500)
    const purchaseHistoryQuery = useInfiniteQuery({
        queryKey: ["purchase-history-query", debouncedSearchValue, statusValue],
        queryFn: ({ pageParam = 1 }) => ordersServices({
            page: pageParam,
            status: statusValue || undefined,
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    })

    const isEmpty = purchaseHistoryQuery.data?.pages[0]?.data?.length === 0;

    return (
        <PageGrid.Root
            flexProps={{
                overflowX: "hidden",
                overflow: isEmpty ? "hidden" : "auto",
                padding: 0,
                height: "100%"
            }}
        >
            <PageGrid.Header
                title="Purchase History"
                description="Easily view, manage and track all orders here."
                {...!isEmpty && {
                    rightContent:
                        <ExportButton />
                }}
            />

            <PageGrid.Content>
                {isEmpty ?
                    <EmptyView /> :
                    <HistoryTable
                        searchValue={searchValue}
                        statusValue={statusValue}
                        onSearchChange={setSearchValue}
                        onStatusChange={setStatusValue}
                        purchaseHistoryQuery={purchaseHistoryQuery}
                    />
                }
            </PageGrid.Content>
        </PageGrid.Root>
    )
}
