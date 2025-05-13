import PageGrid from 'components/redesign/page-grid/PageGrid';
import useDebounce from 'hooks/debounce/useDebounce';
import useAppToast from 'hooks/toast/useToast';
import { exportOrdersReportService } from 'lib/apis/order/services';
import { ordersServices } from 'lib/apis/orders/orderServices';
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import EmptyView from './components/EmptyView';
import HistoryTable from './components/table-components/HistoryTable';
import { AxiosError } from 'axios';

export default function PurchaseHistory() {
    // State management
    const [isExporting, setIsExporting] = useState(false);
    // Search functionality commented out but state kept for future use
    const [searchValue, setSearchValue] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const { showToast } = useAppToast();

    // Debounce search to prevent excessive API calls (kept but not currently used)
    const debouncedSearchValue = useDebounce(searchValue, 1500);

    // Query for purchase history data - search param removed
    const purchaseHistoryQuery = useInfiniteQuery({
        queryKey: ["purchase-history-query", statusValue], // Search removed from dependencies
        queryFn: ({ pageParam = 1 }) => ordersServices({
            page: pageParam,
            status: statusValue || undefined,
        }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    });

    /**
     * Handles exporting orders report as Excel file
     */
    const handleExport = async () => {
        try {
            setIsExporting(true);
            const data = await exportOrdersReportService();

            // Create download link for the Excel file
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `orders-report-${new Date().toISOString().split('T')[0]}.xlsx`;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Clean up URL object
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            const errorMessage = error instanceof AxiosError
                ? error.message
                : "Failed to export orders report";
            showToast({ message: errorMessage, type: "error" });
        } finally {
            setIsExporting(false);
        }
    };

    // Determine if there are no orders to display (removed searchValue check)
    const isEmpty = !purchaseHistoryQuery.isFetching &&
        !purchaseHistoryQuery?.data?.pages[0]?.data?.data?.data.length &&
        !statusValue;

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
                            isLoading: isExporting,
                        }
                    ]
                }}
            />

            <PageGrid.Content>
                {isEmpty ? (
                    <EmptyView />
                ) : (
                    <HistoryTable
                        // Search functionality commented out but props kept for future use
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        statusValue={statusValue}
                        onStatusChange={setStatusValue}
                        purchaseHistoryQuery={purchaseHistoryQuery}
                    />
                )}
            </PageGrid.Content>
        </PageGrid.Root>
    );
}
