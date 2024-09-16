import { Flex, useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import { Invoice, InvoiceStatus } from 'lib/apis/invoice/interfaces'
import { SHOP_URL } from 'lib/utils/app/variable'
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
        { accessorKey: 'email', header: 'Client', cell: info => info.getValue() },
        { accessorKey: 'createdAt', header: 'Created', cell: info => (new Date(info.getValue() as string)).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" }) },
        {
            accessorKey: '',
            header: 'Amount', cell: info => {
                const invoice = info.row.original
                return "N/A"
                // formattedCurrency(info.getValue() as number)
            }
        },
        { accessorKey: 'status', header: 'Status', cell: info => <StatusBadge status={info.getValue() as InvoiceStatus} /> }
    ]

    const openDetailsModal = (invoice: Invoice) => {
        invoiceRef.current = invoice._id
        onOpen()
    }

    const renderActions = (row: Invoice) => {
        const paymentLink = `${SHOP_URL}/paylink/invoice/${row._id}`

        return (
            <Flex alignItems="center" gap={6} sx={{ "svg": { width: 5, height: 5 } }}>
                <button onClick={() => window.open(paymentLink, "_blank")}><AppIcons.Share /></button>
                <button onClick={() => openDetailsModal(row)}><AppIcons.Eye /></button>
                <InvoiceTableMenu invoice={row} />
            </Flex>
        )
    }

    return (
        <>
            <Table isLoading={isLoading} columns={columns} data={invoices} renderActions={renderActions} />
            {isOpen && <InvoiceDetailsModal isOpen={isOpen} onClose={onClose} invoiceId={invoiceRef.current} />}
        </>
    )
}

export default InvoiceTable