import { useDisclosure } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import Table from 'pages/invoice-management/components/Table'
import TextButton from 'pages/invoice-management/components/TextButton'
import React from 'react'

export default function InvoiceProductTable() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const columns: ColumnDef<any>[] = [
        { accessorKey: '_id', header: 'Product', cell: info => info.getValue() },
        { accessorKey: 'color', header: 'Color', cell: info => info.getValue() },
        { accessorKey: 'size', header: 'Size', cell: info => info.getValue() },
        { accessorKey: 'quantity', header: 'Quantity', cell: info => info.getValue() },
        { accessorKey: 'uint', header: 'Uint price', cell: info => info.getValue() },
        { accessorKey: 'total', header: 'Total price', cell: info => info.getValue() }
    ]

    const data = []

    return (
        <>
            <Table
                columns={columns}
                data={data}
                emptyView={
                    <TextButton onClick={onOpen}>
                        <AppIcons.BlackPlus />
                        Add product
                    </TextButton>
                }
            />
        </>
    )
}