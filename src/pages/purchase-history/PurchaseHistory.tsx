import PageGrid from 'components/redesign/page-grid/PageGrid';
import useDebounce from 'hooks/debounce/useDebounce';
import useAppToast from 'hooks/toast/useToast';
import { exportOrdersReportService } from 'lib/apis/order/services';
import { ordersServices } from 'lib/apis/orders/orderServices';
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import EmptyView from './components/EmptyView';
import HistoryTable from './components/HistoryTable';
import { AxiosError } from 'axios';

export default function PurchaseHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [statusValue, setStatusValue] = useState("")
    const { showToast } = useAppToast();
    const debouncedSearchValue = useDebounce(searchValue, 1500)
    const purchaseHistoryQuery = useInfiniteQuery({
        queryKey: ["purchase-history-query", debouncedSearchValue, statusValue],
        queryFn: ({ pageParam = 1 }) => ordersServices({
            page: pageParam,
            status: statusValue || undefined,
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    })

    const handleExport = async () => {
        try {
            setIsLoading(true);
            const data = await exportOrdersReportService();
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${Date.now()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            showToast({ message: (error as AxiosError).message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const isEmpty = !purchaseHistoryQuery?.data?.pages[0]?.data?.data?.data.length && !searchValue && !statusValue;

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Purchase History"
                description="Easily view, manage and track all orders here."
                {...!isEmpty && {
                    actionButtons: [
                        {
                            title: "Export",
                            variant: "secondary",
                            onClick: handleExport,
                            isLoading: isLoading,
                        }
                    ]
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
