import { ColumnDef } from '@tanstack/react-table';
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm';
import AppTypography from "components/common/typography/AppTypography";
import PageGrid from "components/redesign/page-grid/PageGrid";
import Table from "components/redesign/table/Table";
import { Collection } from "lib/apis/collection/interfaces";
import React from "react";
import ControlsListCollection from "./components/controls/Controls";
import CollectionRulesetColumn from './components/ruleset-column/CollectionRulesetColumn';
import CollectionTitleColumn from './components/title-column/CollectionTitleColumn';

interface CollectionGridProps {
    isFetching: boolean;
    rows: Collection[];
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateCollection: () => void;
    onReorderClick: () => void;
    refetch: () => void;
}

function CollectionGrid({
    isFetching,
    rows,
    searchTerm,
    onSearchChange,
    onCreateCollection,
    onReorderClick,
    refetch,
}: CollectionGridProps) {
    const columns: ColumnDef<Collection>[] = [
        {
            accessorKey: 'title',
            header: 'Collection',
            cell: info => <CollectionTitleColumn collection={info.row.original} />
        },
        {
            accessorKey: 'ruleSetID',
            header: 'Rulesets',
            cell: info => info.getValue() ? <CollectionRulesetColumn ruleset={info.getValue()} /> : "-"
        },
        {
            accessorKey: 'productsCount',
            header: 'Products',
            cell: info => info.getValue() || "-"
        },
        {
            accessorKey: 'controls',
            header: '',
            cell: info => <ControlsListCollection collection={info.row.original} fetch={refetch} />
        }
    ]

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Collections"
                description="Create and view inventory collections here."
                actionButtons={[
                    {
                        title: "New Collection",
                        onClick: onCreateCollection,
                        leftIcon: <PlusSm color="#000" />,
                    },
                    {
                        title: "Visibility and reorder",
                        variant: "secondary",
                        onClick: onReorderClick,
                    }
                ]}
            />
            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    onChange: onSearchChange
                }}
            />
            <PageGrid.Content>
                <Table
                    columns={columns}
                    data={rows}
                    isLoading={isFetching}
                    emptyView={
                        <AppTypography fontSize={16} fontWeight={500} color={"white"}>
                            No collections available. Create a new collection to get started.
                        </AppTypography>
                    }
                />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default CollectionGrid