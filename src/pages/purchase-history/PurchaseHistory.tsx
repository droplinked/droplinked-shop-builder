import PageGrid from 'components/redesign/page-grid/PageGrid';
import React from 'react';
import EmptyView from './components/EmptyView';
import ExportButton from './components/ExportButton';

export default function PurchaseHistory() {
    const isEmpty = true;

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
                {...isEmpty && {
                    rightContent:
                        <ExportButton />
                }}
            />

            <PageGrid.Content>
                {isEmpty ?
                    <EmptyView /> :
                    <div>Purchase History Table</div>
                }
            </PageGrid.Content>
        </PageGrid.Root>
    )
}
