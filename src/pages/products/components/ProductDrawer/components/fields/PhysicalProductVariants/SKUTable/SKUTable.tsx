import { ColumnDef } from '@tanstack/react-table'
import { useFormikContext } from 'formik'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import SKURow from './SKURow'

export default function SKUTable() {
    const { values: { sku }, setFieldValue } = useFormikContext<ProductFormValues>()
    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Variant' },
        { accessorKey: '', header: 'Price' },
        { accessorKey: '', header: 'Quantity' },
        { accessorKey: '', header: 'External ID' }
    ]

    const handleInputChange = (index: number, field: string, value: any) => {
        const updatedSKUs = [...sku]
        updatedSKUs[index] = {
            ...updatedSKUs[index],
            [field]: value
        }
        setFieldValue("sku", updatedSKUs)
    }

    return (
        <Table.Root columns={columns}>
            <Table.Head data={sku} />
            <Table.Body>
                {sku.map((sku, index) => (
                    <SKURow
                        key={index}
                        sku={sku}
                        onInputChange={handleInputChange}
                        index={index}
                    />
                ))}
            </Table.Body>
        </Table.Root>
    )
}