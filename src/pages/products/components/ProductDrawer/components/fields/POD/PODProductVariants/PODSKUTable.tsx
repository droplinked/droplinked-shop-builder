import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table-v2/TableV2'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import SKURow from './SKURow'

function PODSKUTable() {
    const { values: { sku }, setFieldValue } = useProductForm()

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Variant' },
        { accessorKey: '', header: 'Price' },
        { accessorKey: '', header: 'Cost' },
        { accessorKey: '', header: 'External ID' }
    ]

    const handlePriceInputChange = (index: number, price: number) => {
        const updatedSKUs = [...sku]
        updatedSKUs[index] = { ...updatedSKUs[index], price }
        setFieldValue('sku', updatedSKUs)
    }

    return (
        <Table.Root columns={columns} >
            <Table.Head data={sku} />
            <Table.Body>
                {sku.map((currentSKU, index) => (
                    <SKURow
                        key={index}
                        currentSKU={currentSKU}
                        index={index}
                        onPriceInputChange={(index, price) => handlePriceInputChange(index, price)}
                    />
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default PODSKUTable