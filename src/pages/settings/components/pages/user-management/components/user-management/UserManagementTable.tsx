import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import { IInvitation } from 'lib/apis/user/interfaces'
import React from 'react'
import UserNameColumn from './UserNameColumn'
import StatusBadge from './StatusBadge'
import EmptyView from './EmptyView'

interface Props {
    data: { data: IInvitation[] }
    isFetching: boolean
}

export default function UserManagementTable({ data, isFetching }: Props) {
    const tableData = data?.data ?? []

    const columns: ColumnDef<IInvitation>[] = [
        {
            accessorKey: 'recipientEmail',
            header: 'Name',
            cell: info => <UserNameColumn userData={info.row.original} />
        },
        {
            accessorKey: 'createdAt',
            header: 'Date Added',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => <StatusBadge status={info.row.original.status} />
        },
    ]

    if (tableData.length === 0 && !isFetching) {
        return <EmptyView />
    }

    return (
        <Table isLoading={isFetching} data={tableData} columns={columns} />
    )
}
