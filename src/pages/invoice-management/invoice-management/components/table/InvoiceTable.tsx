import { Flex, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import { Invoice, InvoiceStatus } from 'lib/apis/invoice/interfaces'
import { formattedCurrency } from 'lib/utils/heper/helpers'
import Table from 'pages/invoice-management/components/Table'
import InvoiceDetailsModal from 'pages/invoice-management/components/invoice-details/InvoiceDetailsModal'
import React, { useRef } from 'react'
import InvoiceTableMenu from './InvoiceTableMenu'
import StatusBadge from './StatusBadge'

interface Props {
    invoices: Invoice[];
    isLoading: boolean;
}

function InvoiceTable({ invoices, isLoading }: Props) {
    const invoiceRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const columns: ColumnDef<Invoice>[] = [
        { accessorKey: '_id', header: 'ID Number', cell: info => info.getValue() },
        { accessorKey: 'client', header: 'Client', cell: info => info.getValue() },
        { accessorKey: 'created', header: 'Created', cell: info => info.getValue() },
        { accessorKey: 'amount', header: 'Amount', cell: info => formattedCurrency(info.getValue() as number) },
        { accessorKey: 'status', header: 'Status', cell: info => <StatusBadge status={info.getValue() as InvoiceStatus} /> }
    ]

    const openDetailsModal = (invoice: Invoice) => {
        invoiceRef.current = invoice._id
        onOpen()
    }

    const renderActions = (row: Invoice) => (
        <Flex alignItems="center" gap={6} sx={{ "svg": { width: 5, height: 5 } }}>
            <button onClick={() => console.log("share")}><AppIcons.Share /></button>
            <button onClick={() => openDetailsModal(row)}><AppIcons.Eye /></button>
            <InvoiceTableMenu invoiceId={row._id} />
        </Flex>
    )

    const data: Invoice[] = [
        {
            _id: 'INV-1001',
            client: 'Acme Corp',
            created: '2024-08-12',
            amount: '1200',
            status: 'ACTIVE',
        },
        {
            _id: 'INV-1002',
            client: 'Globex Inc.',
            created: '2024-08-15',
            amount: '2450.50',
            status: 'ACTIVE',
        },
        {
            _id: 'INV-1003',
            client: 'Soylent Corp',
            created: '2024-08-20',
            amount: '980.75',
            status: 'ACTIVE',
        },
        {
            _id: 'INV-1004',
            client: 'Initech',
            created: '2024-08-25',
            amount: '3150',
            status: 'CHECKED_OUT',
        },
        {
            _id: 'INV-1005',
            client: 'Umbrella Corp',
            created: '2024-08-30',
            amount: '4700.25',
            status: 'PENDING',
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                data={data || invoices}
                renderActions={renderActions}
                isLoading={isLoading}
                enableSorting
            />
            {isOpen && <InvoiceDetailsModal isOpen={isOpen} onClose={onClose} invoiceId={invoiceRef.current} />}
        </>
    )
}

export default InvoiceTable