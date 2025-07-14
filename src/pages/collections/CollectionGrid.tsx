import { Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm';
import PageGrid from "components/redesign/page-grid/PageGrid";
import Table from "components/redesign/table/Table";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/collections/ar.json';
import enLocale from 'locales/collections/en.json';
import React from "react";
import { Collection } from "services/collection/interfaces";
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
    const { t } = useLocaleResources("collections", {
        en: enLocale,
        ar: arLocale
    })
    const columns: ColumnDef<Collection>[] = [
        {
            accessorKey: 'title',
            header: t('columnHeaders.collection'),
            cell: info => <CollectionTitleColumn collection={info.row.original} />
        },
        {
            accessorKey: 'ruleSetID',
            header: t('columnHeaders.rulesets'),
            cell: info => info.getValue() ? <CollectionRulesetColumn ruleset={info.getValue()} /> : "-"
        },
        {
            accessorKey: 'productsCount',
            header: t('columnHeaders.products'),
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
                title={t('title')}
                description={t('description')}
                actionButtons={[
                    {
                        title: t('newCollection'),
                        leftIcon: <PlusSm color="#000" />,
                        onClick: onCreateCollection,
                    },
                    {
                        title: t('visibilityAndReorder'),
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
                        <Text fontWeight={500} color="text.white">
                            {t('emptyState')}
                        </Text>
                    }
                />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default CollectionGrid