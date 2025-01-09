import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import { IInvitation } from 'lib/apis/user/interfaces'
import { getInvitationsService } from 'lib/apis/user/services'
import React from 'react'
import { useQuery } from 'react-query'
import UserNameColumn from './UserNameColumn'
import StatusBadge from './StatusBadge'

export default function UserManagementTable() {
    const { isFetching, data } = useQuery({ queryKey: ["userManagementTable"], queryFn: () => getInvitationsService() })
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

    return (
        <Table isLoading={isFetching} data={tableData} columns={columns} />
    )
}
