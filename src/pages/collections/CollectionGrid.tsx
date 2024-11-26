import React from "react";
import PageGrid from "components/redesign/pageGrid/PageGrid";
import { FaPlus } from "react-icons/fa6";
import { Box, Td, Tr } from "@chakra-ui/react";
import Table from "components/redesign/table-v2/TableV2"; // Updated import
import { collectionsColumns } from "./model";

interface CollectionGridProps {
    isFetching: boolean;
    rows: any[];
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateCollection: () => void;
    onReorderClick: () => void;
}

function CollectionGrid({
    isFetching,
    rows,
    searchTerm,
    onSearchChange,
    onCreateCollection,
    onReorderClick,
}: CollectionGridProps) {

    return (
        <PageGrid.Root loading={isFetching}>
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
            <PageGrid.Content loading={isFetching}>
                <Box width={"100%"}>
                    <Table.Root columns={collectionsColumns}>
                        <Table.Head data={rows} />
                        <Table.Body isLoading={isFetching}>
                            {rows.map((row, index) => (
                                <Tr key={index}>
                                    {collectionsColumns.map((col) => (
                                        <Td key={col.accessorKey}>{row[col.accessorKey].value}</Td>
                                    ))}
                                </Tr>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </PageGrid.Content>
        </PageGrid.Root>
    );
}

export default CollectionGrid;
