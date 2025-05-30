import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import { IInvitation } from 'services/user/interfaces'
import React from 'react'
import UserNameColumn from './UserNameColumn'
import StatusBadge from './StatusBadge'
import EmptyView from '../../../../common/EmptyView'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    data: { data: IInvitation[] }
    isFetching: boolean
}

export default function UserManagementTable({ data, isFetching }: Props) {
    const tableData = data?.data ?? []
    const { t } = useLocaleResources('settings');

    const columns: ColumnDef<IInvitation>[] = [
        {
            accessorKey: 'recipientEmail',
            header: t('settings.userManagement.table.name'),
            cell: info => <UserNameColumn userData={info.row.original} />
        },
        {
            accessorKey: 'createdAt',
            header: t('settings.userManagement.table.dateAdded'),
        },
        {
            accessorKey: 'status',
            header: t('settings.userManagement.table.status'),
            cell: info => <StatusBadge status={info.row.original.status} />
        },
    ]

    if (tableData.length === 0 && !isFetching) {
        return <EmptyView />
    }

    return (
        <Table tableFontSize={16} isLoading={isFetching} data={tableData} columns={columns} />
    )
}
