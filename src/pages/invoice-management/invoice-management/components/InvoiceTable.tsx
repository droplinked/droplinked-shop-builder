import { Flex } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import Table from 'pages/invoice-management/components/Table'
import React from 'react'

function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
    const columns: ColumnDef<Invoice>[] = [
        { accessorKey: '_id', header: 'ID Number', cell: info => info.getValue() },
        { accessorKey: 'client', header: 'Client', cell: info => info.getValue() },
        { accessorKey: 'created', header: 'Created', cell: info => info.getValue() },
        { accessorKey: 'due', header: 'Due date', cell: info => info.getValue() },
        { accessorKey: 'amount', header: 'Amount', cell: info => info.getValue() },
        { accessorKey: 'status', header: 'Status', cell: info => info.getValue() }
    ]

    const data = [
        {
            _id: 'INV-1001',
            client: 'Acme Corp',
            created: '2024-08-12',
            due: '2024-09-12',
            amount: '$1,200.00',
            status: 'Paid',
        },
        {
            _id: 'INV-1002',
            client: 'Globex Inc.',
            created: '2024-08-15',
            due: '2024-09-15',
            amount: '$2,450.50',
            status: 'Pending',
        },
        {
            _id: 'INV-1003',
            client: 'Soylent Corp',
            created: '2024-08-20',
            due: '2024-09-20',
            amount: '$980.75',
            status: 'Overdue',
        },
        {
            _id: 'INV-1004',
            client: 'Initech',
            created: '2024-08-25',
            due: '2024-09-25',
            amount: '$3,150.00',
            status: 'Paid',
        },
        {
            _id: 'INV-1005',
            client: 'Umbrella Corp',
            created: '2024-08-30',
            due: '2024-09-30',
            amount: '$4,700.25',
            status: 'Pending',
        }
    ]

    const renderActions = (row: Invoice) => (
        <Flex alignItems="center" gap={6} sx={{ "svg": { width: 5, height: 5 } }}>
            <button onClick={() => { }}><AppIcons.Share /></button>
            <button onClick={() => { }}><AppIcons.Eye /></button>
            <button onClick={() => { }}><AppIcons.Dots /></button>
        </Flex>
    )

    return <Table columns={columns} data={data} renderActions={renderActions} />
}

export default InvoiceTable