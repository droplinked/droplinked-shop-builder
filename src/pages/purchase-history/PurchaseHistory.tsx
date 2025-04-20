import PageGrid from 'components/redesign/page-grid/PageGrid';
import React from 'react';
import EmptyView from './components/EmptyView';
import ExportButton from './components/ExportButton';
import HistoryTable from './components/HistoryTable';

export default function PurchaseHistory() {
    const isEmpty = false;

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
                {...!!isEmpty && {
                    rightContent:
                        <ExportButton />
                }}
            />

            <PageGrid.Content>
                {isEmpty ?
                    <EmptyView /> :
                    <HistoryTable />
                }
            </PageGrid.Content>
        </PageGrid.Root>
    )
}
