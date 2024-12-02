import React from "react";
import PageGrid from "components/redesign/page-grid/PageGrid";
import { FaPlus } from "react-icons/fa6";
import { Box } from "@chakra-ui/react";
import Table from "components/redesign/table/Table";
import AppTypography from "components/common/typography/AppTypography";
import { ColumnDef } from '@tanstack/react-table';
import { Collection } from "lib/apis/collection/interfaces";
import CollectionTitleColumn from './components/title-column/CollectionTitleColumn';
import CollectionRulesetColumn from './components/ruleset-column/CollectionRulesetColumn';
import ControlsListCollection from "./components/controls/Controls";

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
    ];

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Collections"
                description="Create and view inventory collections here."
                buttons={[
                    {
                        caption: "New Collection",
                        onClick: onCreateCollection,
                        buttonProps: {
                            leftIcon: <FaPlus color="#000" />,
                            height: "36px",
                            borderRadius: "8px",
                            width: "156px",
                            fontSize: "14px"
                        },
                    },
                    {
                        caption: "Visibility and reorder",
                        onClick: onReorderClick,
                        buttonProps: {
                            variant: "solid",
                            backgroundColor: "#292929",
                            border: "none",
                            color: "#fff",
                            height: "36px",
                            borderRadius: "8px",
                            fontSize: "14px"
                        },
                    },
                ]}
            />
            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    onChange: onSearchChange
                }}
            />
            <PageGrid.Content>
                <Box width={"100%"}>
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
                </Box>
            </PageGrid.Content>
        </PageGrid.Root>
    );
}

export default CollectionGrid;
